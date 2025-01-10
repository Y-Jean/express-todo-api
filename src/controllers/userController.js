import status from "http-status";
import db from "../models/index.js";
import userService from "../services/userService.js";

// 사용자 리스트 조회
const getUserList = async (req, res) => {
  const users = await db.User.findAll({
    attributes: ["id", "name", "email"],
  });

  res.status(200).json(users);
};

// 개별 사용자 조회
const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await db.User.findByPk(userId, {
      attributes: ["id", "name", "email"],
    });

    if (!userId || !user) {
      res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    }

    res.status(200).json({
      userId: user.id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    await userService.deleteAccount(req.user);
    res.status(status.OK).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    await userService.updateProfile(req.user, req.body);
    res.status(status.OK).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  const user = req.user;
  const { newPassword } = req.body;

  try {
    await userService.updatePassword(user, newPassword);
    res.status(status.OK).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};

export { getUserList, getUser, deleteAccount, updateProfile, updatePassword };
