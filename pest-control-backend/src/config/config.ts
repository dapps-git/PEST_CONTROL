import path from 'path';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV ?? 'development';
const isTest = env === 'test';

if (!isTest) {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
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

export type AppConfig = typeof config;

export default config;
