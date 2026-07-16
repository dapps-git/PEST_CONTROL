export declare class InvoiceService {
    create(data: any): Promise<(import("mongoose").Document<unknown, {}, import("../model/invoice.model").InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/invoice.model").InvoiceDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    list(filters?: any): Promise<(import("mongoose").Document<unknown, {}, import("../model/invoice.model").InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/invoice.model").InvoiceDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getByScheduledDate(contractId: string, jobId: string, scheduledDate: string): Promise<(import("mongoose").Document<unknown, {}, import("../model/invoice.model").InvoiceDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../model/invoice.model").InvoiceDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=invoice.service.d.ts.map