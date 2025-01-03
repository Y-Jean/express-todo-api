import { User } from "../models/index.js";
import { validationResult } from "express-validator";
import argon2 from "argon2";
import fs from "fs";
import redisClient from "../config/redis.js";
import constants from "../config/constants.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
  }

  // 비밀번호 암호화
  const hashedPassword = await argon2.hash(password);

  // 새로운 사용자 생성
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "success",
  });
};

const deleteAccount = async (req, res) => {
  res.status(201).json({
    message: "success",
  });
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(403).json({ message: "존재하지 않는 사용자입니다." });
  }

  // 암호화된 password 비교
  if (!(await argon2.verify(user.password, password))) {
    return res.status(403).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  let payload = {
    iat: Date.now(),
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  // 암호화 key 가져오기
  const primaryKey = fs.readFileSync(`config/${constants.JWT.PRIVATE_KEY}`);

  // accessToken 생성
  const accessToken = jwt.sign(payload, primaryKey, {
    algorithm: constants.JWT.ALG, // 사용한 암호화 알고리즘
    expiresIn: "20m", // 토큰 유효기간
  });

  await redisClient.set(
    `${constants.CACHE.LOGIN_USER}${user.id}`,
    accessToken,
    constants.CACHE_EXPIRE
  );

  res.status(201).json({
    message: "success",
    userId: user.id,
    accessToken: accessToken,
    tokenType: "Bearer",
  });
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() });
  }

  const user = req.user;

  const { newPassword } = req.body;

  console.log(user, newPassword);

  res.status(201).json({
    message: "success",
  });
};

const updateProfile = async (req, res) => {
  res.status(201).json({
    message: "success",
  });
};

export { signup, deleteAccount, login, updatePassword, updateProfile };
