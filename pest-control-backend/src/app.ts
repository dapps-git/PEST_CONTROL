import express from 'express';
// import helmet from 'helmet';
import cors from 'cors';
import { rootRouter } from './routes/index';
import adminRouter from './routes/admin.routes';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // app.use(helmet());
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:4000', 'http://tweaki.pw', 'https://tweaki.pw'],
    credentials: true,
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Log all incoming requests
  app.use((req, _res, next) => {
    console.error(`[Request Log] ${req.method} ${req.url}`);
    next();
  });

  // Normal routes (local dev)
  app.use('/admin', adminRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api', rootRouter);

  // Namecheap Passenger routes (with /pestcontrol subdirectory prefix)
  app.use('/pestcontrol/admin', adminRouter);
  app.use('/pestcontrol/api/admin', adminRouter);
  app.use('/pestcontrol/api', rootRouter);

  // Log all registered routes for debugging
  console.log("=== Registered Express Routes ===");
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) { // routes registered directly on the app
      console.log(`Route: ${Object.keys(middleware.route.methods).join(',').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') { // router middleware
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          console.log(`Route: ${Object.keys(handler.route.methods).join(',').toUpperCase()} ${middleware.regexp} ${handler.route.path}`);
        }
      });
    }
  });
  console.log("=================================");

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
