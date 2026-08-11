import { z } from "zod";
export declare const createContractSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        contractDate: z.ZodOptional<z.ZodString>;
        aliasName: z.ZodString;
        trnNumber: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        mobile: z.ZodString;
        address: z.ZodObject<{
            street1: z.ZodString;
            street2: z.ZodString;
            city: z.ZodString;
            poBox: z.ZodString;
            emirate: z.ZodString;
            country: z.ZodString;
        }, z.core.$strip>;
        referredByEmployee: z.ZodString;
        quoteValidityDays: z.ZodCoercedNumber<unknown>;
        creditLimit: z.ZodCoercedNumber<unknown>;
        priority: z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
            urgent: "urgent";
        }>;
        paymentTerms: z.ZodEnum<{
            15: "15";
            30: "30";
            45: "45";
            60: "60";
            90: "90";
        }>;
        remarks: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
    params: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateContractSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        contractDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        aliasName: z.ZodOptional<z.ZodString>;
        trnNumber: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        mobile: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            street1: z.ZodString;
            street2: z.ZodString;
            city: z.ZodString;
            poBox: z.ZodString;
            emirate: z.ZodString;
            country: z.ZodString;
        }, z.core.$strip>>;
        referredByEmployee: z.ZodOptional<z.ZodString>;
        quoteValidityDays: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        creditLimit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        priority: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
            urgent: "urgent";
        }>>;
        paymentTerms: z.ZodOptional<z.ZodEnum<{
            15: "15";
            30: "30";
            45: "45";
            60: "60";
            90: "90";
        }>>;
        remarks: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getContractByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteContractSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listContractsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        search: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=contract.validation.d.ts.map