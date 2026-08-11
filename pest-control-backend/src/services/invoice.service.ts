import { Invoice } from "../model/invoice.model";
import { Contract } from "../model/contract.model";
import { AppError } from "../utils/AppError";

export class InvoiceService {
    async create(data: any) {
        if ((!data.clientName || !data.contractNumber) && data.contractId) {
            const contract = await Contract.findById(data.contractId);
            if (contract) {
                if (!data.clientName) data.clientName = contract.title;
                if (!data.contractNumber) data.contractNumber = contract.contractNumber;
            }
        }
        const invoice = await Invoice.create(data);
        return invoice;
    }

    async list(filters: any = {}) {
        const { contractId, jobId, startDate, endDate, search } = filters;
        const query: any = {};

        if (contractId) query.contractId = contractId;
        if (jobId) query.jobId = jobId;
        if (startDate && endDate) {
            query.collectionDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        if (filters.scheduledStartDate && filters.scheduledEndDate) {
            query.scheduledDate = { $gte: new Date(filters.scheduledStartDate), $lte: new Date(filters.scheduledEndDate) };
        }

        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const matchingContracts = await Contract.find({
                $or: [
                    { title: { $regex: escapedSearch, $options: "i" } },
                    { aliasName: { $regex: escapedSearch, $options: "i" } },
                    { contractNumber: { $regex: escapedSearch, $options: "i" } }
                ]
            }).select("_id");

            const matchingContractIds = matchingContracts.map((c: any) => c._id);

            query.$or = [
                { contractNumber: { $regex: escapedSearch, $options: "i" } },
                { clientName: { $regex: escapedSearch, $options: "i" } },
                { contractId: { $in: matchingContractIds } },
                { "items.description": { $regex: escapedSearch, $options: "i" } }
            ];
        }

        const invoices = await Invoice.find(query)
            .populate("contractId", "title contractNumber email phone")
            .sort({ collectionDate: -1 })
            .lean();

        return invoices.map((inv: any) => {
            const contract = inv.contractId && typeof inv.contractId === "object" ? inv.contractId : null;
            return {
                ...inv,
                clientName: inv.clientName || contract?.title || "Client Invoice",
                contractNumber: inv.contractNumber || contract?.contractNumber || ""
            };
        });
    }

    async getByScheduledDate(contractId: string, jobId: string, scheduledDate: string) {
        const start = new Date(scheduledDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(scheduledDate);
        end.setHours(23, 59, 59, 999);

        return await Invoice.findOne({
            contractId,
            jobId,
            scheduledDate: { $gte: start, $lte: end }
        });
    }
}
