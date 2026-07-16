"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
const uri = process.env.MONGO_URI || "mongodb+srv://dappstech2025_db_user:dapps1234@cluster0.ecrnbjn.mongodb.net/PEST?retryWrites=true&w=majority&appName=Cluster0";
console.log("Attempting to connect to MongoDB...");
console.log("URI:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password
mongoose_1.default.connect(uri)
    .then(() => {
    console.log("✅ MongoDB Connection Successful!");
    process.exit(0);
})
    .catch((err) => {
    console.error("❌ MongoDB Connection Failed:");
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=test-db.js.map