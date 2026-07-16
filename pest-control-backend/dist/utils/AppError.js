"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    code;
    metadata;
    constructor({ message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', metadata }) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.metadata = metadata;
        Error.captureStackTrace?.(this, AppError);
    }
}
exports.AppError = AppError;
const isAppError = (error) => error instanceof AppError;
exports.isAppError = isAppError;
//# sourceMappingURL=AppError.js.map