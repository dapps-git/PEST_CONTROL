"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const env = process.env.NODE_ENV ?? 'development';
const isTest = env === 'test';
if (!isTest) {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
}
const rawPort = process.env.PORT ?? '4000';
const port = /^\d+$/.test(rawPort) ? Number.parseInt(rawPort, 10) : rawPort;
const config = {
    env,
    isDev: env === 'development',
    isProd: env === 'production',
    port,
    logLevel: process.env.LOG_LEVEL ?? 'info'
};
exports.default = config;
//# sourceMappingURL=config.js.map