import { JobType } from "../model/contract.model";
export declare class ContractService {
    create(data: any): Promise<(import("mongoose").Document<unknown, {}, import("../model/contract.model").ContractDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/contract.model").ContractDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    list({ page, limit, search, startDate, endDate }: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../model/contract.model").ContractDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/contract.model").ContractDocument & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../model/contract.model").ContractDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/contract.model").ContractDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("../model/contract.model").ContractDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/contract.model").ContractDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<void>;
    addJobToContract(id: string, jobData: JobType): Promise<import("mongoose").Document<unknown, {}, import("../model/contract.model").ContractDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/contract.model").ContractDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getJobById(contractId: string, jobId: string): Promise<import("mongoose").Types.Subdocument<string, unknown, JobType> & JobType>;
    updateJob(contractId: string, jobId: string, updates: any): Promise<(import("mongoose").Types.Subdocument<string, unknown, JobType> & JobType) | undefined>;
    deleteJob(contractId: string, jobId: string): Promise<{
        success: boolean;
    }>;
    getDashboardStats(): Promise<{
        expiredContracts: any[];
        expiringContracts: any[];
        overdueSchedules: any[];
        stats: {
            totalActiveContracts: number;
            scheduledThisWeek: number;
            actionRequired: number;
        };
    }>;
}
//# sourceMappingURL=contract.service.d.ts.map