"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../services/auth.service");
const loginController = async (req, res) => {
    const { email, password } = req.body;
    const authService = new auth_service_1.AuthService();
    const user = await authService.login(email, password);
    const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });
    return res.json({
        success: true,
        token,
        user,
    });
};
exports.loginController = loginController;
//# sourceMappingURL=auth.controller.js.map