import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import path from "path";
import swaggerDocs from "./utils/swagger.js";
import {
  notFoundHandler,
  errorHandler,
  apiErrorHandler,
} from "./middlewares/error.js";

// 라우터 임포트
import indexRouter from "./routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(path.dirname(import.meta.url), "public")));

// Swagger 설정
swaggerDocs(app);

// API 버전 설정
const version = process.env.API_VERSION || "v1";

// 라우트
app.use(`/api/${version}`, indexRouter);

// error handler 설정
app.use(notFoundHandler);
app.use(apiErrorHandler);
app.use(errorHandler);

export default app;
