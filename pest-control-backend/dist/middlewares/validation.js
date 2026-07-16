"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const validateRequest = (schema) => (req, _res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            next(new AppError_1.AppError({
                message: 'Invalid request payload.',
                statusCode: 400,
                code: 'VALIDATION_ERROR',
                metadata: error.flatten()
            }));
            return;
        }
        next(error);
    }
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.js.map