import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController.js";
import * as authMiddleware from "../middlewares/validations/authMiddleware.js";
import JWTMiddleware from "../middlewares/JWTMiddleware.js";

/**
 * @openapi
 * /v1/auth/signup:
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
 *       200:
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
router.post("/signup", authMiddleware.signupValidation, authController.signup);

router.delete(
  "/delete",
  [JWTMiddleware, authMiddleware.passwordValidation],
  authController.deleteAccount
);

router.post("/login", authMiddleware.loginValidation, authController.login);

router.put(
  "/update-password",
  [JWTMiddleware, authMiddleware.updatePasswordValidation],
  authController.updatePassword
);

router.put("/update", authController.updateProfile);

export default router;
