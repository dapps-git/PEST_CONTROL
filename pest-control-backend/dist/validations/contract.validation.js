"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listContractsSchema = exports.deleteContractSchema = exports.getContractByIdSchema = exports.updateContractSchema = exports.createContractSchema = void 0;
const zod_1 = require("zod");
const addressSchema = zod_1.z.object({
    street1: zod_1.z.string().min(1),
    street2: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    poBox: zod_1.z.string().min(1),
    emirate: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1)
});
exports.createContractSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        aliasName: zod_1.z.string().min(1),
        trnNumber: zod_1.z.string().min(1),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().min(1),
        mobile: zod_1.z.string().min(1),
        address: addressSchema,
        referredByEmployee: zod_1.z.string().min(1),
        quoteValidityDays: zod_1.z.coerce.number().min(1),
        creditLimit: zod_1.z.coerce.number().min(0),
        priority: zod_1.z.enum(["low", "medium", "high", "urgent"]),
        paymentTerms: zod_1.z.enum(["15", "30", "45", "60", "90"]),
        remarks: zod_1.z.string().min(1)
    }),
    query: zod_1.z.object({}).optional(),
    params: zod_1.z.object({}).optional()
});
exports.updateContractSchema = zod_1.z.object({
    body: exports.createContractSchema.shape.body.partial(),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1)
    })
});
exports.getContractByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1)
    })
});
exports.deleteContractSchema = exports.getContractByIdSchema;
exports.listContractsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().optional(),
        limit: zod_1.z.coerce.number().optional(),
        search: zod_1.z.string().optional()
    })
});
//# sourceMappingURL=contract.validation.js.map