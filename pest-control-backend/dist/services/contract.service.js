"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const contract_model_1 = require("../model/contract.model");
const AppError_1 = require("../utils/AppError");
class ContractService {
    async create(data) {
        if (data.contractDate) {
            data.contractDate = new Date(data.contractDate);
        }
        return await contract_model_1.Contract.create(data);
    }
    async list({ page = 1, limit = 10, search = "", startDate = null, endDate = null }) {
        const filter = {};
        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.$or = [
                { title: { $regex: escapedSearch, $options: "i" } },
                { aliasName: { $regex: escapedSearch, $options: "i" } },
                { trnNumber: { $regex: escapedSearch, $options: "i" } },
                { contractNumber: { $regex: escapedSearch, $options: "i" } },
            ];
        }
        if (startDate && endDate) {
            filter["jobs"] = {
                $elemMatch: {
                    startDate: { $lte: new Date(endDate) },
                    endDate: { $gte: new Date(startDate) },
                },
            };
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            contract_model_1.Contract.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
            contract_model_1.Contract.countDocuments(filter),
        ]);
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getById(id) {
        const doc = await contract_model_1.Contract.findById(id);
        if (!doc) {
            throw new AppError_1.AppError({
                message: "Contract not found",
                statusCode: 404,
            });
        }
        return doc;
    }
    async update(id, data) {
        const updateData = { ...data };
        delete updateData._id;
        delete updateData.contractNumber;
        delete updateData.createdAt;
        delete updateData.updatedAt;
        delete updateData.__v;
        delete updateData.jobs;
        if (updateData.contractDate) {
            updateData.contractDate = new Date(updateData.contractDate);
        }
        const updated = await contract_model_1.Contract.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            throw new AppError_1.AppError({
                message: "Contract not found",
                statusCode: 404,
            });
        }
        return updated;
    }
    async delete(id) {
        const deleted = await contract_model_1.Contract.findByIdAndDelete(id);
        if (!deleted) {
            throw new AppError_1.AppError({
                message: "Contract not found",
                statusCode: 404,
            });
        }
    }
    async addJobToContract(id, jobData) {
        const contract = await contract_model_1.Contract.findById(id);
        if (!contract) {
            throw new AppError_1.AppError({ message: "Contract not found", statusCode: 404 });
        }
        contract.jobs.forEach((job) => {
            if (!job.dayType)
                job.dayType = "day";
            if (job.status === "pending")
                job.status = "work pending";
            if (job.servicesProducts) {
                job.servicesProducts.forEach((sp) => {
                    if (!sp.frequencyUnit)
                        sp.frequencyUnit = "month";
                });
            }
        });
        const newJob = contract.jobs.create(jobData);
        contract.jobs.push(newJob);
        await contract.save();
        return contract;
    }
    async getJobById(contractId, jobId) {
        const contract = await contract_model_1.Contract.findById(contractId);
        console.log("contract jobs:", contract);
        if (!contract) {
            throw new AppError_1.AppError({ message: "Contract not found", statusCode: 404 });
        }
        const job = await contract.jobs.find((j) => j._id?.toString() === jobId.toString());
        console.log("jobs:", job);
        if (!job) {
            throw new AppError_1.AppError({ message: "Job not found", statusCode: 404 });
        }
        return job;
    }
    async updateJob(contractId, jobId, updates) {
        const flatUpdates = {};
        for (const [key, val] of Object.entries(updates)) {
            if (key === "invoiceReminder" || key === "servicesProducts") {
                flatUpdates[`jobs.$.${key}`] = val;
            }
            else {
                flatUpdates[`jobs.$.${key}`] = val;
            }
        }
        const result = await contract_model_1.Contract.findOneAndUpdate({ _id: contractId, "jobs._id": jobId }, { $set: flatUpdates }, { new: true, runValidators: true });
        if (!result)
            throw new AppError_1.AppError({
                message: "Job or contract not found",
                statusCode: 404,
            });
        const updatedJob = result.jobs.find((j) => j._id.toString() === jobId.toString());
        return updatedJob;
    }
    async deleteJob(contractId, jobId) {
        const result = await contract_model_1.Contract.findByIdAndUpdate(contractId, { $pull: { jobs: { _id: jobId } } }, { new: true });
        if (!result)
            throw new AppError_1.AppError({
                message: "Contract not found or job not removed",
                statusCode: 404,
            });
        return { success: true };
    }
    async getDashboardStats() {
        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);
        const contracts = await contract_model_1.Contract.find().lean();
        const expiredContracts = [];
        const expiringContracts = [];
        const overdueSchedules = [];
        let scheduledThisWeek = 0;
        let totalActiveContracts = 0;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        for (const contract of contracts) {
            if (!contract.jobs || contract.jobs.length === 0)
                continue;
            const jobs = contract.jobs;
            const latestEndDate = new Date(Math.max(...jobs.map((j) => new Date(j.endDate).getTime())));
            if (latestEndDate < today) {
                expiredContracts.push({
                    id: contract.contractNumber,
                    client: contract.title,
                    expiry: latestEndDate.toISOString().split("T")[0],
                    status: "expired",
                });
            }
            else {
                totalActiveContracts++;
                if (latestEndDate <= next30Days) {
                    expiringContracts.push({
                        id: contract.contractNumber,
                        client: contract.title,
                        expiry: latestEndDate.toISOString().split("T")[0],
                        status: "expiring",
                    });
                }
            }
            for (const job of jobs) {
                const jobDate = new Date(job.startDate);
                if (jobDate >= startOfWeek && jobDate <= endOfWeek) {
                    scheduledThisWeek++;
                }
                if (job.status === "work pending" && jobDate < today) {
                    const diffTime = Math.abs(today.getTime() - jobDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    overdueSchedules.push({
                        id: job._id,
                        client: contract.title,
                        service: job.servicesProducts?.[0]?.serviceType || "Service",
                        dueDate: jobDate.toISOString().split("T")[0],
                        daysOverdue: diffDays,
                    });
                }
            }
        }
        return {
            expiredContracts,
            expiringContracts,
            overdueSchedules,
            stats: {
                totalActiveContracts,
                scheduledThisWeek,
                actionRequired: expiredContracts.length + overdueSchedules.length,
            },
        };
    }
}
exports.ContractService = ContractService;
//# sourceMappingURL=contract.service.js.map