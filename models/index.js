import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

// 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = { sequelize };

async function loadModels() {
  // models 폴더에서 index.js를 제외한 파일 이름 추출
  const files = readdirSync(__dirname).filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.endsWith(".js")
  );

  // 모델 로드
  for (const file of files) {
    const filePath = pathToFileURL(path.join(__dirname, file)).href; // file:// URL로 변환
    const model = await import(filePath);
    const modelInstance = model.default || model; // model에 default가 있으면 default, 아니면 모델 전체 사용
    db[modelInstance.name] = modelInstance;
  }

  // 모델간 관계 설정
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

// 모델 로드 호출
loadModels().catch((err) => {
  logger.error(`모델 로딩 중 에러 발생: ${err.message}\n${err.stack}`); // 에러를 로그 파일에 기록
});

export default db;
