"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInvoiceStatus = exports.listInvoices = exports.createInvoice = void 0;
const invoice_service_1 = require("../services/invoice.service");
const service = new invoice_service_1.InvoiceService();
const createInvoice = async (req, res) => {
    const data = await service.create(req.body);
    res.status(201).json({ success: true, data });
};
exports.createInvoice = createInvoice;
const listInvoices = async (req, res) => {
    const data = await service.list(req.query);
    res.json({ success: true, data });
};
exports.listInvoices = listInvoices;
const checkInvoiceStatus = async (req, res) => {
    const { contractId, jobId, scheduledDate } = req.query;
    if (!contractId || !jobId || !scheduledDate) {
        return res.status(400).json({ success: false, message: "Missing required parameters" });
    }
    const invoice = await service.getByScheduledDate(contractId, jobId, scheduledDate);
    res.json({ success: true, collected: !!invoice, data: invoice });
};
exports.checkInvoiceStatus = checkInvoiceStatus;
//# sourceMappingURL=invoice.controller.js.map