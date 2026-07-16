import { Router } from "express";
import multer from "multer";
import {
  adminLogin,
  getDocuments,
  addDocument,
  deleteDocument,
  verifyPassword,
  changePassword,
} from "../controllers/admin.controller";
import { protectRoute } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Auth (public)
router.post("/login", asyncHandler(adminLogin));

// Secured Admin Routes
router.post("/verify-password", protectRoute, asyncHandler(verifyPassword));
router.post("/change-password", protectRoute, asyncHandler(changePassword));

// Documents
router.get("/getDocuments", protectRoute, asyncHandler(getDocuments));
router.post(
  "/addDocument",
  protectRoute,
  upload.fields([
    { name: "file0", maxCount: 1 },
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "file5", maxCount: 1 },
    { name: "file6", maxCount: 1 },
  ]),
  asyncHandler(addDocument)
);
router.delete("/deleteDocument/:id", protectRoute, asyncHandler(deleteDocument));

export default router;
