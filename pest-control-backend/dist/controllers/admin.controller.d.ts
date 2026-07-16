import { Request, Response } from "express";
export declare const adminLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDocuments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=admin.controller.d.ts.map