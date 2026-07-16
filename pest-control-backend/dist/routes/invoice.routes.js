"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invoice_controller_1 = require("../controllers/invoice.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post("/", (0, asyncHandler_1.asyncHandler)(invoice_controller_1.createInvoice));
router.get("/", (0, asyncHandler_1.asyncHandler)(invoice_controller_1.listInvoices));
router.get("/status", (0, asyncHandler_1.asyncHandler)(invoice_controller_1.checkInvoiceStatus));
exports.default = router;
//# sourceMappingURL=invoice.routes.js.map