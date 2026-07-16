import mongoose from "mongoose";
import logger from "./logger";
import { AdminModel } from "../model/admin.model";

const MAX_RETRIES = 5;
let retryCount = 0;

const seedAdmin = async () => {
  try {
    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || "admin@pestcontrol.com";
      const passwordHash = process.env.ADMIN_PASSWORD_HASH || "$2b$10$qev1Em8wdlmuFX7HehltD.S74ewl1beKJnc/REQcQAexegcnDSNo2";
      await AdminModel.create({ email, passwordHash });
      logger.info(`✅ Admin user seeded in database: ${email}`);
    }
  } catch (error) {
    logger.error(error as Error, "Failed to seed admin user");
  }
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("MongoDB connected successfully");
    await seedAdmin();
  } catch (error) {
    retryCount++;
    logger.error(
      `MongoDB connection failed (Attempt ${retryCount}/${MAX_RETRIES}): ${(error as Error).message}`
    );

    if (retryCount >= MAX_RETRIES) {
      logger.error("Max retries reached. Exiting.");
      process.exit(1);
    }

    const retryIn = 3000;
    logger.info(`🔁 Retrying in ${retryIn / 1000} seconds...`);
    setTimeout(connectDB, retryIn);
  }
};
