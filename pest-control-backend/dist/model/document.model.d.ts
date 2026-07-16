import { Document, Model } from "mongoose";
export interface IDocument extends Document {
    companyNameAr: string;
    companyNameEn: string;
    yearOfReport: string;
    fileAr?: {
        data: Buffer;
        contentType: string;
    };
    fileEn?: {
        data: Buffer;
        contentType: string;
    };
    files?: Array<{
        label: string;
        date: string;
        year: string;
        fileData: Buffer;
        contentType: string;
    }>;
    createdAt: Date;
}
export declare const DocumentModel: Model<IDocument>;
//# sourceMappingURL=document.model.d.ts.map