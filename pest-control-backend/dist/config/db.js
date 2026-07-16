"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const admin_model_1 = require("../model/admin.model");
const MAX_RETRIES = 5;
let retryCount = 0;
const seedAdmin = async () => {
    try {
        const adminCount = await admin_model_1.AdminModel.countDocuments();
        if (adminCount === 0) {
            const email = process.env.ADMIN_EMAIL || "admin@pestcontrol.com";
            const passwordHash = process.env.ADMIN_PASSWORD_HASH || "$2b$10$qev1Em8wdlmuFX7HehltD.S74ewl1beKJnc/REQcQAexegcnDSNo2";
            await admin_model_1.AdminModel.create({ email, passwordHash });
            logger_1.default.info(`✅ Admin user seeded in database: ${email}`);
        }
    }
    catch (error) {
        logger_1.default.error(error, "Failed to seed admin user");
    }
};
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        logger_1.default.info("MongoDB connected successfully");
        await seedAdmin();
    }
    catch (error) {
        retryCount++;
        logger_1.default.error(`MongoDB connection failed (Attempt ${retryCount}/${MAX_RETRIES}): ${error.message}`);
        if (retryCount >= MAX_RETRIES) {
            logger_1.default.error("Max retries reached. Exiting.");
            process.exit(1);
        }
        const retryIn = 3000;
        logger_1.default.info(`🔁 Retrying in ${retryIn / 1000} seconds...`);
        setTimeout(exports.connectDB, retryIn);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map