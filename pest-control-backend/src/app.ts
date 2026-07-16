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

  // Strip /pestcontrol subdirectory prefix added by Passenger on Namecheap
  app.use((req, _res, next) => {
    if (req.url.startsWith('/pestcontrol')) {
      req.url = req.url.slice('/pestcontrol'.length) || '/';
    }
    console.error(`[Request Log] ${req.method} ${req.url}`);
    next();
  });

  app.use('/admin', adminRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api', rootRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
