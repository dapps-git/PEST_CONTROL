"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const errorHandler_1 = require("./middlewares/errorHandler");
const createApp = () => {
    const app = (0, express_1.default)();
    app.disable('x-powered-by');
    app.set('trust proxy', 1);
    // app.use(helmet());
    // Explicit CORS Middleware to ensure preflights & Authorization header are always allowed
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        if (origin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        else {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, authorization, Content-Type, content-type, Origin, Accept, X-Requested-With, Access-Control-Request-Headers, Access-Control-Request-Method');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
            return;
        }
        next();
    });
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // Log all incoming requests with full details to stderr (so cPanel logs it)
    app.use((req, _res, next) => {
        console.error(`[Request Debug Log] METHOD: ${req.method} | URL: ${req.url} | ORIGINAL: ${req.originalUrl} | BASE: ${req.baseUrl} | PATH: ${req.path}`);
        next();
    });
    // Normal routes (local dev)
    app.use('/admin', admin_routes_1.default);
    app.use('/api/admin', admin_routes_1.default);
    app.use('/api', index_1.rootRouter);
    // Namecheap Passenger routes (with /pestcontrol subdirectory prefix)
    app.use('/pestcontrol/admin', admin_routes_1.default);
    app.use('/pestcontrol/api/admin', admin_routes_1.default);
    app.use('/pestcontrol/api', index_1.rootRouter);
    app.use(notFoundHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map