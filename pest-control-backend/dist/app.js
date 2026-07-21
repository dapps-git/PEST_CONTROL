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
    const corsOptions = {
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const allowed = [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
                'http://localhost:5176',
                'http://localhost:4000',
                'http://tweaki.pw',
                'https://tweaki.pw',
                'https://pest-control-flame.vercel.app'
            ];
            if (allowed.includes(origin) || origin.endsWith('.vercel.app')) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Authorization',
            'authorization',
            'Content-Type',
            'content-type',
            'Origin',
            'Accept',
            'X-Requested-With',
            'Access-Control-Allow-Headers',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers'
        ],
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
    app.options('*', (0, cors_1.default)(corsOptions));
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