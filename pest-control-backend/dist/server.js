"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const config_1 = __importDefault(require("./config/config"));
const app_1 = require("./app");
const logger_1 = __importDefault(require("./config/logger"));
const db_1 = require("./config/db");
const app = (0, app_1.createApp)();
const server = node_http_1.default.createServer(app);
(async () => {
    await (0, db_1.connectDB)();
    server.listen(config_1.default.port, () => {
        logger_1.default.info(`🚀 Server running at http://localhost:${config_1.default.port} in ${config_1.default.env} mode`);
    });
})();
const shutdown = (signal) => {
    logger_1.default.info(`Received ${signal}. Closing server...`);
    server.close(() => {
        logger_1.default.info("HTTP server closed.");
        process.exit(0);
    });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
//# sourceMappingURL=server.js.map