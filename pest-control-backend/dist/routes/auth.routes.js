"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_1 = require("../middlewares/validation");
const auth_validation_1 = require("../validations/auth.validation");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post("/login", (0, validation_1.validateRequest)(auth_validation_1.loginSchema), (0, asyncHandler_1.asyncHandler)(auth_controller_1.loginController));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map