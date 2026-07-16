import { Request, Response } from "express";
export declare const createContract: (req: Request, res: Response) => Promise<void>;
export declare const listContracts: (req: Request, res: Response) => Promise<void>;
export declare const getDashboardStats: (req: Request, res: Response) => Promise<void>;
export declare const getContractById: (req: Request, res: Response) => Promise<void>;
export declare const updateContract: (req: Request, res: Response) => Promise<void>;
export declare const deleteContract: (req: Request, res: Response) => Promise<void>;
export declare const addJobToContract: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getJobById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateJob: (req: Request, res: Response) => Promise<void>;
export declare const deleteJob: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=contract.controller.d.ts.map