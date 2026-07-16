import { Document, Model, Types } from "mongoose";
export interface Address {
    street1: string;
    street2: string;
    city: string;
    poBox: string;
    emirate: string;
    country: string;
}
export interface ServiceProduct {
    serviceType: "building_cleaning" | "tanks_containers_cleaning" | "disinfection_sterilization" | "pest_control";
    instructions: string;
    units: number;
    rate: number;
    subtotalPerYear: number;
    frequencyDays: number;
    frequencyUnit: "day" | "week" | "month" | "year" | "custom";
    isEvery: boolean;
    customFrequencyValue?: number;
    customFrequencyUnit?: "day" | "week" | "month" | "year";
}
export interface InvoiceReminder {
    startDate: Date;
    endDate: Date;
    billingFrequency: "monthly" | "quarterly" | "semi_annually" | "annually" | "custom";
    customFrequencyValue?: number;
    customFrequencyUnit?: "day" | "week" | "month" | "year";
}
export interface VisitRecord {
    visitDate: Date;
    status: "work pending" | "work done" | "work informed";
    completedAt?: Date;
    notes?: string;
}
export interface JobType {
    _id?: string;
    jobType: "recurring" | "one_off";
    contractDate: Date;
    startDate: Date;
    endDate: Date;
    contractedBy: string;
    expiryRemindBefore: number;
    isTaxExempt: boolean;
    remarks?: string;
    invoiceReminder: InvoiceReminder;
    servicesProducts: ServiceProduct[];
    visitRecords?: VisitRecord[];
    subtotal: number;
    vat: number;
    grandTotal: number;
    status: "work pending" | "work done" | "work informed";
    dayType: "day" | "night";
    createdAt: Date;
    updatedAt: Date;
}
export interface ContractDocument extends Document {
    contractNumber: string;
    title: string;
    aliasName: string;
    trnNumber: string;
    email: string;
    phone: string;
    mobile: string;
    address: Address;
    referredByEmployee: string;
    quoteValidityDays: number;
    creditLimit: number;
    remarks: string;
    jobs: Types.DocumentArray<JobType>;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Contract: Model<ContractDocument>;
//# sourceMappingURL=contract.model.d.ts.map