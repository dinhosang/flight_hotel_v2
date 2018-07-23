import winston, { transports, format, combine } from 'winston';

const activeTransports = {
  console: new transports.Console({
    level: process.env.LOG_LEVEL || 'debug'
  }),
  exception: new transports.Console()
};

const logger = winston.createLogger({
  transports: [activeTransports.console],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    format.simple(),
    // format.json(),
  ),
  exceptionHandlers: [activeTransports.exception]
});

export {logger as default};
