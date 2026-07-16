"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("./config"));
const logger = (0, pino_1.default)({
    level: config_1.default.logLevel,
    base: { env: config_1.default.env },
    ...(config_1.default.isDev && {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: true,
                colorize: true,
                messageFormat: '{msg} - {reqId}',
            },
        },
    }),
});
exports.default = logger;
//# sourceMappingURL=logger.js.map