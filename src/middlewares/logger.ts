import winston, { format } from 'winston';
const { combine, timestamp, label, printf, colorize, errors } = format;

export const logger = winston.createLogger({
  format: combine(
    label({ label: 'ecom' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    errors({ stack: true }),
    printf(({ level, message, label, timestamp, stack }) => {
      return `${timestamp} [${label}] ${level}: ${stack || message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
