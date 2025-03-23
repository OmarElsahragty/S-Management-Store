import { createLogger, transports, format as winstonFormat } from "winston";

const format = winstonFormat.combine(
  winstonFormat.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winstonFormat.printf((info) => {
    const stack = info["stack"] ? `\n${info["stack"]}` : "";
    return `${info["timestamp"]} [${info.level.toUpperCase()}] - ${info.message}${stack}`;
  })
);

export const logger = createLogger({
  format,
  transports: [
    new transports.Console({ format }),
    new transports.File({
      filename: "logs/info.log",
      zippedArchive: true,
      level: "info",
    }),
    new transports.File({
      filename: "logs/errors.log",
      zippedArchive: true,
      level: "error",
    }),
  ],
});
