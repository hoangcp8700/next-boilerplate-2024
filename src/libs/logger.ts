import pinoLogger, { Logger } from 'pino';

let loggerInit: Logger;

const getLogger = () => {
  if (!loggerInit) {
    const deploymentEnv = process.env.NODE_ENV || 'development';
    loggerInit = pinoLogger({
      level: deploymentEnv === 'production' ? 'info' : 'debug',
    });
  }
  return loggerInit;
};

export const logger = getLogger();

export const getCorrelationId = (headers: Headers) => {
  let correlationId = headers.get('x-correlation-id');
  if (!correlationId) {
    correlationId = crypto.randomUUID();
  }
  return correlationId;
};
