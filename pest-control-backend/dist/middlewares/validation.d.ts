import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
export declare const validateRequest: (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map