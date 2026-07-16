import { Request, Response } from "express";
export declare const createInvoice: (req: Request, res: Response) => Promise<void>;
export declare const listInvoices: (req: Request, res: Response) => Promise<void>;
export declare const checkInvoiceStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=invoice.controller.d.ts.map