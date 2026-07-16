import express from 'express';
// import helmet from 'helmet';
import cors from 'cors';
import logger from './config/logger';
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

  // Log all incoming requests with full details
  app.use((req, _res, next) => {
    logger.info({
      method: req.method,
      url: req.url,
      originalUrl: req.originalUrl,
      baseUrl: req.baseUrl,
      path: req.path
    }, `[Request Debug Log] ${req.method} ${req.url}`);
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

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
