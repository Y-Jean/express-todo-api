import status from "http-status";
import authService from "../services/authService.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    await authService.register(name, email, password);
    res.status(status.CREATED).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken } = await authService.login(email, password);
    res.status(status.OK).json({
      message: "success",
      userId: user.id,
      accessToken: accessToken,
      tokenType: "Bearer",
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user);
    res.status(status.OK).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};

export { register, login, logout };
