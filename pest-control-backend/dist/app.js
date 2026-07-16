"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
// import helmet from 'helmet';
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const errorHandler_1 = require("./middlewares/errorHandler");
const createApp = () => {
    const app = (0, express_1.default)();
    app.disable('x-powered-by');
    app.set('trust proxy', 1);
    // app.use(helmet());
    app.use((0, cors_1.default)({
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:4000'],
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        console.log(`[Request] ${req.method} ${req.url}`);
        next();
    });
    app.use('/admin', admin_routes_1.default);
    app.use('/api/admin', admin_routes_1.default);
    app.use('/api', index_1.rootRouter);
    app.use(notFoundHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map