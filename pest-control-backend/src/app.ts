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
  // Explicit CORS Middleware to ensure preflights & Authorization header are always allowed
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, authorization, Content-Type, content-type, Origin, Accept, X-Requested-With, Access-Control-Request-Headers, Access-Control-Request-Method'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Log all incoming requests with full details to stderr (so cPanel logs it)
  app.use((req, _res, next) => {
    console.error(`[Request Debug Log] METHOD: ${req.method} | URL: ${req.url} | ORIGINAL: ${req.originalUrl} | BASE: ${req.baseUrl} | PATH: ${req.path}`);
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
