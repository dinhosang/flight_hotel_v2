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
  logger.info(`\n\tRequest received: ${JSON.stringify({
    "Method": req.method,
    "IP": req.ip,
    "Host-name": req.hostname,
    "Base Url": req.baseUrl,
    "Path": req.path,
    "Full Url": req.originalUrl,
    "Protocol": req.protocol
  })}`);
  next();
}

const response404LoggingMiddleware = (req, res, next) => {
  logger.error(`\n\t404 Request received: ${JSON.stringify({
    "Response Status": res.statusCode,
    "Request Method": res.req.method,
    "Request IP": res.req.ip,
    "Request Host-name": res.req.hostname,
    "Request Base Url": res.req.baseUrl,
    "Request Path": res.req.path,
    "Request Full Url": res.req.originalUrl,
    "Request Protocol": res.req.protocol
  })}`);
  next();
}

export {logger as default, requestLoggingMiddleware, response404LoggingMiddleware};
