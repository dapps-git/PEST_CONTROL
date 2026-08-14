import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import logger from "./logger";
import { AdminModel } from "../model/admin.model";

const MAX_RETRIES = 5;
let retryCount = 0;

const seedAdmin = async () => {
  try {
    const email = (process.env.ADMIN_EMAIL || "admin@pestcontrol.com").toLowerCase();
    const defaultPasswordHash = "$2b$10$cgwqgapy4Z/8hUGuWCfc9uFuygmQrcdLsq8D/HTYqG2RxdDttWf7y"; // default: admin@123
    const plainPassword = process.env.ADMIN_PASSWORD || "admin@123";
    
    let passwordHash = process.env.ADMIN_PASSWORD_HASH || defaultPasswordHash;
    if (process.env.ADMIN_PASSWORD) {
      passwordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    }

    let admin = await AdminModel.findOne({ email });
    if (!admin) {
      admin = await AdminModel.create({ email, passwordHash });
      logger.info(`✅ Admin user seeded in database: ${email}`);
    } else {
      const isMatch = await bcrypt.compare(plainPassword, admin.passwordHash);
      if (!isMatch && (process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH)) {
        admin.passwordHash = passwordHash;
        await admin.save();
        logger.info(`✅ Admin password updated for: ${email}`);
      }
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
