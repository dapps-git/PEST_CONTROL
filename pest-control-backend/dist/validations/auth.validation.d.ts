import { z } from "zod";
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
    params: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=auth.validation.d.ts.map