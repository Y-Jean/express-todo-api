import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { queryLogger } from "../utils/logger.js";

dotenv.config();

// MariaDB 연결 설정
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (sql) => queryLogger.info(sql),
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
