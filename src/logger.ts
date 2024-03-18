import { createLogger, format, transports } from 'winston';

const commonTransports = [
  new transports.Console(),
  new transports.File({
    filename: 'error.log',
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
  }),
];

const combinedTransport = new transports.File({
  filename: 'combined.log',
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
});

const notificationTransporter = new transports.File({
  filename: 'notification.log',
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.metadata(),
    format.json()
  ),
});

const logger = createLogger({
  transports: [...commonTransports, combinedTransport],
});

const notifyLogger = createLogger({
  transports: [...commonTransports, notificationTransporter],
});

export { logger, notifyLogger };