import express from "express";
import * as userController from "../controllers/userController.js";
import * as userValidation from "../validations/userValidation.js";
import JWTMiddleware from "../middlewares/JWTMiddleware.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/**
 * @openapi
 * v1/users:
 *   get:
 *     tags:
 *       - 사용자
 *     summary: 전체 사용자 조회
 *     description: 전체 사용자 리스트 조회
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 사용자 id
 *                   name:
 *                     type: string
 *                     description: 이름
 *                   email:
 *                     type: string
 *                     description: 이메일
 *                 example:
 *                   - id: 1
 *                     name: "김사람"
 *                     email: "john.doe@example.com"
 *                   - id: 2
 *                     name: "이사람"
 *                     email: "jane.smith@example.com"
 */
router.get("/", userController.getUserList);

/**
 * @openapi
 * v1/users/{userId}:
 *   get:
 *     tags:
 *       - 사용자
 *     summary: 특정 유저 정보
 *     description: 특정 유저 정보를 ID로 검색해 조회
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: user id 입력
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: 사용자 id
 *                 name:
 *                   type: string
 *                   description: 이름
 *                 email:
 *                   type: string
 *                   description: 이메일
 *               example:
 *                 userId: "1"
 *                 name: "김사람"
 *                 email: "john.doe@example.com"
 */
router.get("/:userId", userController.getUser);

router.delete(
  "/deleteAccount",
  [JWTMiddleware, validate(userValidation.password)],
  userController.deleteAccount
);

router.put(
  "/updatePassword",
  [JWTMiddleware, validate(userValidation.updatePassword)],
  userController.updatePassword
);

router.put("/updateProfile", JWTMiddleware, userController.updateProfile);

export default router;
