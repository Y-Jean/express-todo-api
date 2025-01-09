import createError from "http-errors";
import status from "http-status";
import { logger } from "../utils/logger.js";

// catch 404 and forward to error handler
const notFoundHandler = (req, res, next) => {
  next(createError(404));
};

// error handler
const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // log 파일에 기록
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};

// api 에러 처리 미들웨어
const apiErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || status.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  // log 파일에 기록
  if (statusCode >= 500) {
    logger.error(`API Error: ${message}`, {
      statusCode,
      url: req.originalUrl,
      method: req.method,
    });
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { notFoundHandler, errorHandler, apiErrorHandler };
