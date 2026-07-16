"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const contract_routes_1 = require("./contract.routes");
const invoice_routes_1 = __importDefault(require("./invoice.routes"));
const router = (0, express_1.Router)();
exports.rootRouter = router;
router.use("/auth", auth_routes_1.default);
router.use("/contracts", contract_routes_1.contractRouter);
router.use("/invoices", invoice_routes_1.default);
//# sourceMappingURL=index.js.map