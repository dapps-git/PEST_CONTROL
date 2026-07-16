"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const logger_1 = __importDefault(require("../config/logger"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    const appError = (0, AppError_1.isAppError)(err)
        ? err
        : new AppError_1.AppError({
            message: err.message || 'Unexpected error occurred.',
            statusCode: 500
        });
    const responsePayload = {
        success: false,
        error: {
            code: appError.code,
            message: appError.message,
            metadata: appError.metadata
        }
    };
    logger_1.default.error({
        err: appError,
        code: appError.code,
        statusCode: appError.statusCode,
        metadata: appError.metadata
    }, appError.message);
    if (res.headersSent) {
        return res.end();
    }
    return res.status(appError.statusCode).json(responsePayload);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map