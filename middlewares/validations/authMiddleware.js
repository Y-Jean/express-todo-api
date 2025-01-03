import { body } from "express-validator";

// 회원가입 유효성 검사 미들웨어
export const signupValidation = [
  body("name").notEmpty().withMessage("이름을 입력해주세요."),
  body("email")
    .notEmpty()
    .withMessage("이메일을 입력해주세요.")
    .isEmail()
    .withMessage("유효한 이메일이 아닙니다."),
  body("password")
    .notEmpty()
    .withMessage("비밀번호를 입력해주세요.")
    .isLength({ min: 8 })
    .withMessage("비밀번호는 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^_])[A-Za-z\d@$!%*?&^_]+$/
    )
    .withMessage("비밀번호는 대소문자, 숫자, 특수기호를 포함해야 합니다."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("비밀번호 확인을 입력해주세요.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
];

// 회원가입 유효성 검사 미들웨어
export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("이메일을 입력해주세요.")
    .isEmail()
    .withMessage("유효한 이메일이 아닙니다."),
  body("password")
    .notEmpty()
    .withMessage("비밀번호를 입력해주세요.")
    .isLength({ min: 8 })
    .withMessage("비밀번호는 8자 이상이어야 합니다."),
];

export const updatePasswordValidation = [
  body("newPassword")
    .notEmpty()
    .withMessage("새 비밀번호를 입력해주세요.")
    .isLength({ min: 8 })
    .withMessage("비밀번호는 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^_])[A-Za-z\d@$!%*?&^_]+$/
    )
    .withMessage("비밀번호는 대소문자, 숫자, 특수기호를 포함해야 합니다.")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        throw new Error("새 비밀번호는 기존 비밀번호와 같을 수 없습니다.");
      }
      return true;
    }),
  body("confirmNewPassword")
    .notEmpty()
    .withMessage("새 비밀번호 확인을 입력해주세요.")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      return true;
    }),
];

// 회원가입 유효성 검사 미들웨어
export const passwordValidation = [
  body("password")
    .notEmpty()
    .withMessage("비밀번호를 입력해주세요.")
    .isLength({ min: 8 })
    .withMessage("비밀번호는 8자 이상이어야 합니다."),
];
