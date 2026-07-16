import { Request, Response } from "express";
import { DocumentModel } from "../model/document.model";
import { AuthService } from "../services/auth.service";
import { AdminModel } from "../model/admin.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const FILE_LABELS = ["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"];

// POST /admin/login
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authService = new AuthService();
  const user = await authService.login(email, password);
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || ("24h" as any),
  });
  return res.json({ success: true, token, data: { ...user, token } });
};

// POST /admin/verify-password
export const verifyPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const userEmail = (req as any).user?.email;

  console.log("[verifyPassword] Started with userEmail:", userEmail, "password length:", password?.length);

  if (!userEmail) {
    console.log("[verifyPassword] Failed: No userEmail in request.");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const admin = await AdminModel.findOne({ email: userEmail });
  if (!admin) {
    console.log("[verifyPassword] Failed: Admin not found for email:", userEmail);
    return res.status(404).json({ success: false, message: "Admin not found" });
  }

  const match = await bcrypt.compare(password, admin.passwordHash);
  console.log("[verifyPassword] Bcrypt comparison result for email:", userEmail, "match:", match);
  return res.json({ success: true, isValid: match });
};

// POST /admin/change-password
export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userEmail = (req as any).user?.email;

  if (!userEmail) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const admin = await AdminModel.findOne({ email: userEmail });
  if (!admin) {
    return res.status(404).json({ success: false, message: "Admin not found" });
  }

  const match = await bcrypt.compare(oldPassword, admin.passwordHash);
  if (!match) {
    return res.status(400).json({ success: false, message: "Incorrect old password." });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  admin.passwordHash = passwordHash;
  await admin.save();

  return res.json({ success: true, message: "Password updated successfully." });
};

// GET /admin/getDocuments
export const getDocuments = async (req: Request, res: Response) => {
  const documents = await DocumentModel.find().sort({ createdAt: -1 });
  return res.json({ success: true, data: { data: documents } });
};

// POST /admin/addDocument (multipart/form-data)
export const addDocument = async (req: Request, res: Response) => {
  const { companyNameAr, companyNameEn } = req.body;

  if (!companyNameAr || !companyNameEn) {
    return res
      .status(400)
      .json({ success: false, message: "Company names are required." });
  }

  const files: any[] = [];
  const uploadedFiles = req.files as { [fieldname: string]: Express.Multer.File[] };

  FILE_LABELS.forEach((label, index) => {
    const key = `file${index}`;
    const fileArr = uploadedFiles?.[key];
    if (fileArr && fileArr.length > 0) {
      const f = fileArr[0];
      files.push({
        label,
        date: req.body[`date${index}`] || "",
        year: req.body[`year${index}`] || "",
        fileData: f.buffer,
        contentType: f.mimetype,
      });
    }
  });

  const doc = new DocumentModel({
    companyNameAr,
    companyNameEn,
    yearOfReport: req.body["year0"] || "",
    files,
  });

  await doc.save();
  return res.status(201).json({ success: true, data: doc });
};

// DELETE /admin/deleteDocument/:id
export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await DocumentModel.findByIdAndDelete(id);
  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Document not found." });
  }
  return res.json({ success: true, message: "Document deleted." });
};
