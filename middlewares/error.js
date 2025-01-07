import status from "http-status";

// 에러 처리 미들웨어
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || status.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { errorHandler };
