"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.addJobToContract = exports.deleteContract = exports.updateContract = exports.getContractById = exports.getDashboardStats = exports.listContracts = exports.createContract = void 0;
const contract_service_1 = require("../services/contract.service");
const service = new contract_service_1.ContractService();
const createContract = async (req, res) => {
    const data = await service.create(req.body);
    res.status(201).json({ success: true, data });
};
exports.createContract = createContract;
const listContracts = async (req, res) => {
    const { page, limit, search } = req.query;
    const result = await service.list({
        page: Number(page),
        limit: Number(limit),
        search: search,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
    });
    res.json({ success: true, ...result });
};
exports.listContracts = listContracts;
const getDashboardStats = async (req, res) => {
    const stats = await service.getDashboardStats();
    res.json({ success: true, data: stats });
};
exports.getDashboardStats = getDashboardStats;
const getContractById = async (req, res) => {
    const data = await service.getById(req.params.id);
    res.json({ success: true, data });
};
exports.getContractById = getContractById;
const updateContract = async (req, res) => {
    const data = await service.update(req.params.id, req.body);
    res.json({ success: true, data });
};
exports.updateContract = updateContract;
const deleteContract = async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
};
exports.deleteContract = deleteContract;
const addJobToContract = async (req, res) => {
    const { id } = req.params;
    const jobData = req.body;
    const contract = await service.addJobToContract(id, jobData);
    return res.status(201).json({
        success: true,
        message: "Job added successfully",
        data: contract,
    });
};
exports.addJobToContract = addJobToContract;
const getJobById = async (req, res) => {
    const jobs = await service.getJobById(req.params.id, req.params.jobId);
    return res.status(200).json({
        success: true,
        data: jobs,
    });
};
exports.getJobById = getJobById;
const updateJob = async (req, res) => {
    const { id, jobId } = req.params;
    const updates = req.body;
    const updatedJob = await service.updateJob(id, jobId, updates);
    res.json({ success: true, data: updatedJob });
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    const { id, jobId } = req.params;
    await service.deleteJob(id, jobId);
    res.status(204).send();
};
exports.deleteJob = deleteJob;
//# sourceMappingURL=contract.controller.js.map