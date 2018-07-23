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

const requestLoggingMiddleware = (req, res, next) => {
  logger.info(`Request received: ${{
    "Method": req.method,
    "IP": req.ip,
    "Base Url": req.baseUrl,
    "Path": req.path,
    "Full Url": req.originalUrl,
    "Protocol": req.protocol
  }}`)
}

export {logger as default};
