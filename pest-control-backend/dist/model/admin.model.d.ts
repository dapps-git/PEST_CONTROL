import { Document, Model } from "mongoose";
export interface IAdmin extends Document {
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AdminModel: Model<IAdmin>;
//# sourceMappingURL=admin.model.d.ts.map