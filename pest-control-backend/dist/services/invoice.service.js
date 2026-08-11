"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const invoice_model_1 = require("../model/invoice.model");
const contract_model_1 = require("../model/contract.model");
class InvoiceService {
    async create(data) {
        if ((!data.clientName || !data.contractNumber) && data.contractId) {
            const contract = await contract_model_1.Contract.findById(data.contractId);
            if (contract) {
                if (!data.clientName)
                    data.clientName = contract.title;
                if (!data.contractNumber)
                    data.contractNumber = contract.contractNumber;
            }
        }
        const invoice = await invoice_model_1.Invoice.create(data);
        return invoice;
    }
    async list(filters = {}) {
        const { contractId, jobId, startDate, endDate, search } = filters;
        const query = {};
        if (contractId)
            query.contractId = contractId;
        if (jobId)
            query.jobId = jobId;
        if (startDate && endDate) {
            query.collectionDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (filters.scheduledStartDate && filters.scheduledEndDate) {
            query.scheduledDate = { $gte: new Date(filters.scheduledStartDate), $lte: new Date(filters.scheduledEndDate) };
        }
        if (search) {
            query.$or = [
                { contractNumber: { $regex: search, $options: "i" } },
                { clientName: { $regex: search, $options: "i" } },
                { "items.description": { $regex: search, $options: "i" } }
            ];
        }
        const invoices = await invoice_model_1.Invoice.find(query)
            .populate("contractId", "title contractNumber email phone")
            .sort({ collectionDate: -1 })
            .lean();
        return invoices.map((inv) => {
            const contract = inv.contractId && typeof inv.contractId === "object" ? inv.contractId : null;
            return {
                ...inv,
                clientName: inv.clientName || contract?.title || "Client Invoice",
                contractNumber: inv.contractNumber || contract?.contractNumber || ""
            };
        });
    }
    async getByScheduledDate(contractId, jobId, scheduledDate) {
        const start = new Date(scheduledDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(scheduledDate);
        end.setHours(23, 59, 59, 999);
        return await invoice_model_1.Invoice.findOne({
            contractId,
            jobId,
            scheduledDate: { $gte: start, $lte: end }
        });
    }
}
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map