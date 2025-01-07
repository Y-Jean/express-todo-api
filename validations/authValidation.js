import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^_])[A-Za-z\d@$!%*?&^_]+$/;

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      "any.required": "이름은 필수 입력 사항입니다.",
      "string.empty": "이름은 비워둘 수 없습니다.",
    }),
    email: Joi.string().required().email().messages({
      "any.required": "이메일은 필수 입력 사항입니다.",
      "string.email": "유효한 이메일 주소를 입력해주세요.",
      "string.empty": "이메일은 비워둘 수 없습니다.",
    }),
    password: Joi.string().required().min(8).pattern(passwordRegex).messages({
      "any.required": "비밀번호는 필수 입력 사항입니다.",
      "string.min": "비밀번호는 최소 8자 이상이어야 합니다.",
      "string.pattern.base":
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
    }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.required": "비밀번호 확인은 필수 입력 사항입니다.",
        "any.only": "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      }),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "any.required": "이메일은 필수 입력 사항입니다.",
      "string.email": "유효한 이메일 주소를 입력해주세요.",
      "string.empty": "이메일은 비워둘 수 없습니다.",
    }),
    password: Joi.string().required().min(8).pattern(passwordRegex).messages({
      "any.required": "비밀번호는 필수 입력 사항입니다.",
      "string.min": "비밀번호는 최소 8자 이상이어야 합니다.",
      "string.pattern.base":
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
    }),
  }),
};

export { register, login };
