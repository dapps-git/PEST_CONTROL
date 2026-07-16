"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.addDocument = exports.getDocuments = exports.changePassword = exports.verifyPassword = exports.adminLogin = void 0;
const document_model_1 = require("../model/document.model");
const auth_service_1 = require("../services/auth.service");
const admin_model_1 = require("../model/admin.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const FILE_LABELS = ["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"];
// POST /admin/login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const authService = new auth_service_1.AuthService();
    const user = await authService.login(email, password);
    const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });
    return res.json({ success: true, token, data: { ...user, token } });
};
exports.adminLogin = adminLogin;
// POST /admin/verify-password
const verifyPassword = async (req, res) => {
    const { password } = req.body;
    const userEmail = req.user?.email;
    console.log("[verifyPassword] Started with userEmail:", userEmail, "password length:", password?.length);
    if (!userEmail) {
        console.log("[verifyPassword] Failed: No userEmail in request.");
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const admin = await admin_model_1.AdminModel.findOne({ email: userEmail });
    if (!admin) {
        console.log("[verifyPassword] Failed: Admin not found for email:", userEmail);
        return res.status(404).json({ success: false, message: "Admin not found" });
    }
    const match = await bcrypt_1.default.compare(password, admin.passwordHash);
    console.log("[verifyPassword] Bcrypt comparison result for email:", userEmail, "match:", match);
    return res.json({ success: true, isValid: match });
};
exports.verifyPassword = verifyPassword;
// POST /admin/change-password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userEmail = req.user?.email;
    if (!userEmail) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const admin = await admin_model_1.AdminModel.findOne({ email: userEmail });
    if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
    }
    const match = await bcrypt_1.default.compare(oldPassword, admin.passwordHash);
    if (!match) {
        return res.status(400).json({ success: false, message: "Incorrect old password." });
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const passwordHash = await bcrypt_1.default.hash(newPassword, salt);
    admin.passwordHash = passwordHash;
    await admin.save();
    return res.json({ success: true, message: "Password updated successfully." });
};
exports.changePassword = changePassword;
// GET /admin/getDocuments
const getDocuments = async (req, res) => {
    const documents = await document_model_1.DocumentModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: { data: documents } });
};
exports.getDocuments = getDocuments;
// POST /admin/addDocument (multipart/form-data)
const addDocument = async (req, res) => {
    const { companyNameAr, companyNameEn } = req.body;
    if (!companyNameAr || !companyNameEn) {
        return res
            .status(400)
            .json({ success: false, message: "Company names are required." });
    }
    const files = [];
    const uploadedFiles = req.files;
    FILE_LABELS.forEach((label, index) => {
        const key = `file${index}`;
        const fileArr = uploadedFiles?.[key];
        if (fileArr && fileArr.length > 0) {
            const f = fileArr[0];
            if (f) {
                files.push({
                    label,
                    date: req.body[`date${index}`] || "",
                    year: req.body[`year${index}`] || "",
                    fileData: f.buffer,
                    contentType: f.mimetype,
                });
            }
        }
    });
    const doc = new document_model_1.DocumentModel({
        companyNameAr,
        companyNameEn,
        yearOfReport: req.body["year0"] || "",
        files,
    });
    await doc.save();
    return res.status(201).json({ success: true, data: doc });
};
exports.addDocument = addDocument;
// DELETE /admin/deleteDocument/:id
const deleteDocument = async (req, res) => {
    const { id } = req.params;
    const deleted = await document_model_1.DocumentModel.findByIdAndDelete(id);
    if (!deleted) {
        return res
            .status(404)
            .json({ success: false, message: "Document not found." });
    }
    return res.json({ success: true, message: "Document deleted." });
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=admin.controller.js.map