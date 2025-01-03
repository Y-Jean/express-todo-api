import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yamljs';
import dotenv from 'dotenv';

dotenv.config();

// .env 파일에서 url 설정 받아오기
const appUrl = process.env.APP_URL || 'http://localhost';
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',  // Swagger 버전
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'Express 기반의 Todo API',
    },
    servers: [
      {
        url: `${appUrl}:${port}`,  // 서버 URL (개발 환경)
      },
    ],
  },

  apis: ['./routes/*.js', './models/*.js'],  // API 문서화할 파일들
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  // Swagger UI 설정 (Swagger UI를 특정 경로에서 제공)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Swagger YAML을 제공할 엔드포인트 추가
  app.get('/swagger.yaml', (req, res) => {
    const yamlSpec = YAML.stringify(swaggerSpec, 10); // 10은 들여쓰기 수준
    res.header('Content-Type', 'application/x-yaml');
    res.send(yamlSpec);
  });

  // Swagger YAML 파일로 저장 (프로젝트 루트 디렉토리에)
  const yamlFilePath = './openapi.yaml';
  fs.writeFileSync(yamlFilePath, YAML.stringify(swaggerSpec, 10));
  console.log(`Swagger YAML file is saved at ${yamlFilePath}`);
};

export default swaggerDocs;