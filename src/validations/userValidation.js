import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^_])[A-Za-z\d@$!%*?&^_]+$/;

const updatePassword = {
  body: Joi.object().keys({
    newPassword: Joi.string()
      .required()
      .min(8)
      .pattern(passwordRegex)
      .messages({
        "any.required": "비밀번호는 필수 입력 사항입니다.",
        "string.min": "비밀번호는 최소 8자 이상이어야 합니다.",
        "string.pattern.base":
          "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      }),
    confirmNewPassword: Joi.string()
      .required()
      .valid(Joi.ref("newPassword"))
      .messages({
        "any.required": "비밀번호 확인은 필수 입력 사항입니다.",
        "any.only": "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      }),
  }),
};

const password = {
  body: Joi.object().keys({
    password: Joi.string().required().min(8).pattern(passwordRegex).messages({
      "any.required": "비밀번호는 필수 입력 사항입니다.",
      "string.min": "비밀번호는 최소 8자 이상이어야 합니다.",
      "string.pattern.base":
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
    }),
  }),
};

export { updatePassword, password };
