import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const uri = process.env.MONGO_URI || "mongodb+srv://mohhammedmanzoor_db_user:8wBB76eDiGtQiEdt@cluster0.webb3i8.mongodb.net/PEST?retryWrites=true&w=majority&appName=Cluster0";

console.log("Attempting to connect to MongoDB...");
console.log("URI:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password

mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connection Successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:");
    console.error(err);
    process.exit(1);
  });
