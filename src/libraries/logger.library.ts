import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf(info => `${info["timestamp"]} [${info.level.toUpperCase()}] - ${info.message}\n${info["stack"]}`)
  ),
  transports: [new transports.File({ filename: "logs/errors.log" })],
});
