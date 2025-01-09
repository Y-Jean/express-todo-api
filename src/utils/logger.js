import winston from "winston";
import moment from "moment-timezone";
import "winston-daily-rotate-file";

const nodeEnv = process.env.NODE_ENV || "development";
const timezone = "Asia/Seoul";

const logger = winston.createLogger({
  level: nodeEnv === "production" ? "warn" : "http",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"), // 시간대 설정
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/%DATE%-app.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "90d", // 90일 로그 유지
    }),
    // console에도 같은 로그 출력
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

const queryLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"), // 시간대 설정
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/%DATE%-app.log", // 일반 에러로그와 같은 파일에 입력, 필요할 경우 분리 가능
      datePattern: "YYYY-MM-DD",
      maxFiles: "90d", // 90일 로그 유지
    }),
  ],
});

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

export { logger, queryLogger, stream };
