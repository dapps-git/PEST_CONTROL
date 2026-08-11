import mongoose, { Document, Model } from "mongoose";
export interface InvoiceItem {
    description: string;
    units: number;
    rate: number;
    subtotal: number;
}
export interface InvoiceDocument extends Document {
    contractId: mongoose.Types.ObjectId;
    jobId: mongoose.Types.ObjectId;
    contractNumber: string;
    clientName?: string;
    scheduledDate: Date;
    collectionDate: Date;
    items: InvoiceItem[];
    grandTotal: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Invoice: Model<InvoiceDocument>;
//# sourceMappingURL=invoice.model.d.ts.map