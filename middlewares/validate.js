import status from "http-status";

const validate = (schema) => (req, res, next) => {
  // validation 검증, 모든 에러를 출력
  const { error } = schema.body.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(status.UNPROCESSABLE_ENTITY).json({
      message: "Validation Error",
      errors: errorMessages,
    });
  }

  return next();
};

export default validate;
