"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const protectRoute = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError_1.AppError({
            message: "Unauthorized",
            statusCode: 401,
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new AppError_1.AppError({
            message: "Unauthorized",
            statusCode: 401,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        throw new AppError_1.AppError({
            message: "Invalid or expired token.",
            statusCode: 401,
        });
    }
};
exports.protectRoute = protectRoute;
//# sourceMappingURL=auth.js.map