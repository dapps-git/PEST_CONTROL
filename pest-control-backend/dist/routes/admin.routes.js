"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_1 = require("../middlewares/auth");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Auth (public)
router.post("/login", (0, asyncHandler_1.asyncHandler)(admin_controller_1.adminLogin));
// Secured Admin Routes
router.post("/verify-password", auth_1.protectRoute, (0, asyncHandler_1.asyncHandler)(admin_controller_1.verifyPassword));
router.post("/change-password", auth_1.protectRoute, (0, asyncHandler_1.asyncHandler)(admin_controller_1.changePassword));
// Documents
router.get("/getDocuments", auth_1.protectRoute, (0, asyncHandler_1.asyncHandler)(admin_controller_1.getDocuments));
router.post("/addDocument", auth_1.protectRoute, upload.fields([
    { name: "file0", maxCount: 1 },
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "file5", maxCount: 1 },
    { name: "file6", maxCount: 1 },
]), (0, asyncHandler_1.asyncHandler)(admin_controller_1.addDocument));
router.delete("/deleteDocument/:id", auth_1.protectRoute, (0, asyncHandler_1.asyncHandler)(admin_controller_1.deleteDocument));
exports.default = router;
//# sourceMappingURL=admin.routes.js.map