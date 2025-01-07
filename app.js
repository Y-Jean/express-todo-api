import cookieParser from "cookie-parser";
import createError from "http-errors";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import path from "path";
import db from "./models/index.js";
import redisClient from "./config/redis.js";
import swaggerDocs from "./utils/swagger.js";
import { errorHandler } from "./middlewares/error.js";

// 라우터 임포트
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(import.meta.url), "public")));

// .env 사용 설정
dotenv.config();

// Swagger 설정
swaggerDocs(app);

// API 버전 설정
const version = process.env.API_VERSION || "v1";

// 라우트
app.use("/", indexRouter);
app.use(`/${version}/users`, usersRouter);
app.use(`/${version}/tasks`, tasksRouter);
app.use(`/${version}/auth`, authRouter);

// 포트 설정
const PORT = process.env.PORT || 3000;

// 데이터베이스 연결, 서버 시작
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Redis 연결 확인
redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Failed to connect Redis", err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(errorHandler);

export default app;
