import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDocument extends Document {
  companyNameAr: string;
  companyNameEn: string;
  yearOfReport: string;
  fileAr?: { data: Buffer; contentType: string };
  fileEn?: { data: Buffer; contentType: string };
  files?: Array<{
    label: string;
    date: string;
    year: string;
    fileData: Buffer;
    contentType: string;
  }>;
  createdAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    companyNameAr: { type: String, required: true },
    companyNameEn: { type: String, required: true },
    yearOfReport: { type: String, default: "" },
    files: [
      {
        label: { type: String },
        date: { type: String },
        year: { type: String },
        fileData: { type: Buffer },
        contentType: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const DocumentModel: Model<IDocument> =
  mongoose.models.Document ||
  mongoose.model<IDocument>("Document", documentSchema);
