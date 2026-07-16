"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const addressSchema = new mongoose_1.Schema({
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    poBox: { type: String },
    emirate: { type: String },
    country: { type: String },
}, { _id: false });
const serviceProductSchema = new mongoose_1.Schema({
    serviceType: {
        type: String,
        enum: [
            "building_cleaning",
            "tanks_containers_cleaning",
            "disinfection_sterilization",
            "pest_control",
        ]
    },
    instructions: { type: String, default: "" },
    units: { type: Number, min: 0 },
    rate: { type: Number, min: 0 },
    subtotalPerYear: { type: Number, min: 0 },
    frequencyDays: { type: Number, min: 1 },
    frequencyUnit: {
        type: String,
        enum: ["day", "week", "month", "year", "custom"],
    },
    isEvery: { type: Boolean, default: false },
    customFrequencyValue: { type: Number },
    customFrequencyUnit: {
        type: String,
        enum: ["day", "week", "month", "year"],
    },
}, { _id: false });
const invoiceReminderSchema = new mongoose_1.Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    billingFrequency: {
        type: String,
        enum: ["monthly", "quarterly", "semi_annually", "annually", "custom"],
    },
    customFrequencyValue: { type: Number },
    customFrequencyUnit: {
        type: String,
        enum: ["day", "week", "month", "year"],
    },
}, { _id: false });
const visitRecordSchema = new mongoose_1.Schema({
    visitDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["work pending", "work done", "work informed"],
        default: "work pending",
    },
    completedAt: { type: Date },
    notes: { type: String },
}, { _id: false });
const jobSchema = new mongoose_1.Schema({
    jobType: {
        type: String,
        enum: ["recurring", "one_off"],
    },
    contractDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    contractedBy: { type: String },
    expiryRemindBefore: { type: Number, min: 0 },
    isTaxExempt: { type: Boolean, default: false },
    remarks: { type: String, default: "" },
    invoiceReminder: { type: invoiceReminderSchema },
    servicesProducts: { type: [serviceProductSchema] },
    visitRecords: { type: [visitRecordSchema], default: [] },
    status: { type: String, enum: ["work pending", "work done", "work informed"], default: "work pending" },
    dayType: { type: String, enum: ["day", "night"] },
    subtotal: { type: Number, min: 0 },
    vat: { type: Number, min: 0 },
    grandTotal: { type: Number, min: 0 },
}, { timestamps: true });
const contractSchema = new mongoose_1.Schema({
    contractNumber: {
        type: String,
        unique: true,
        immutable: true,
    },
    title: { type: String },
    aliasName: { type: String },
    trnNumber: { type: String },
    email: { type: String },
    phone: { type: String },
    mobile: { type: String },
    address: { type: addressSchema },
    referredByEmployee: { type: String },
    quoteValidityDays: { type: Number },
    creditLimit: { type: Number },
    remarks: { type: String },
    jobs: { type: [jobSchema], default: [] },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
contractSchema.pre("validate", async function () {
    if (this.contractNumber)
        return;
    const lastContract = await exports.Contract.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;
    if (lastContract?.contractNumber) {
        const lastNum = parseInt(lastContract.contractNumber.replace("PST", ""));
        nextNumber = lastNum + 1;
    }
    this.contractNumber = "PST" + nextNumber.toString().padStart(3, "0");
});
exports.Contract = mongoose_1.default.models.Contract ||
    mongoose_1.default.model("Contract", contractSchema);
//# sourceMappingURL=contract.model.js.map