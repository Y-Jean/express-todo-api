import express from "express";
import * as authController from "../controllers/authController.js";
import * as authValidation from "../validations/authValidation.js";
import JWTMiddleware from "../middlewares/JWTMiddleware.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/**
 * @openapi
 * /v1/auth/register:
 *   post:
 *     tags:
 *       - 회원 관리
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 김사람1
 *                 description: 사용자 이름
 *               email:
 *                 type: string
 *                 example: saaraam1@example.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 example: Tkfka123!@
 *                 description: 사용자 비밀번호
 *               confirmPassword:
 *                 type: string
 *                 example: Tkfka123!@
 *                 description: 사용자 비밀번호 확인
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: 회원가입 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *       403:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *               example:
 *                 errors: [
 *                   {
 *                     type: 'field',
 *                     value: 'Tk',
 *                     msg: '비밀번호는 8자 이상이어야 합니다.',
 *                     path: 'password',
 *                     location: 'body'
 *                   }
 *                 ]
 *       400:
 *         description: 이메일 중복 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미 존재하는 이메일입니다."
 */
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - 회원 관리
 *     summary: 로그인
 *     description: 로그인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: saaraam1@example.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 example: Tkfka123!@
 *                 description: 사용자 비밀번호
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: 로그인 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *       401:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "status": "error",
 *                   "statusCode": 401,
 *                   "message": "비밀번호가 일치하지 않습니다."
 *                 }
 *       404:
 *         description: 사용자가 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "status": "error",
 *                   "statusCode": 404,
 *                   "message": "사용자가 존재하지 않습니다."
 *                 }
 */
router.post("/login", validate(authValidation.login), authController.login);

/**
 * @openapi
 * /v1/auth/logout:
 *   post:
 *     tags:
 *       - 회원 관리
 *     summary: 로그아웃
 *     description: 로그아웃합니다.
 *     responses:
 *       200:
 *         description: 로그아웃 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *       401:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "status": "error",
 *                   "statusCode": 401,
 *                   "message": "이미 로그아웃된 사용자입니다."
 *                 }
 */
router.post("/logout", JWTMiddleware, authController.logout);

export default router;
