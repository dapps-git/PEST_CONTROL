"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppError_1 = require("../utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = require("../model/admin.model");
class AuthService {
    async login(email, password) {
        const admin = await admin_model_1.AdminModel.findOne({ email: email.toLowerCase() });
        if (!admin) {
            throw new AppError_1.AppError({
                message: "Invalid email or password.",
                statusCode: 401,
            });
        }
        const match = await bcrypt_1.default.compare(password, admin.passwordHash);
        if (!match) {
            throw new AppError_1.AppError({
                message: "Invalid email or password.",
                statusCode: 401,
            });
        }
        return { email: admin.email };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map