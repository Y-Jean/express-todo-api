import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yamljs";

const appUrl = process.env.APP_URL || "http://localhost";
const port = process.env.APP_PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Express 기반의 Todo API",
    },
    servers: [
      {
        url: `${appUrl}:${port}`,
      },
    ],
  },

  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  // Swagger UI 설정 (Swagger UI를 특정 경로에서 제공)
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/swagger.yaml", (req, res) => {
    const yamlSpec = YAML.stringify(swaggerSpec, 10); // 10은 들여쓰기 수준
    res.header("Content-Type", "application/x-yaml");
    res.send(yamlSpec);
  });

  const yamlFilePath = "./openapi.yaml";
  fs.writeFileSync(yamlFilePath, YAML.stringify(swaggerSpec, 10));
  console.log(`Swagger YAML file is saved at ${yamlFilePath}`);
};

export default swaggerDocs;
