import argon2 from "argon2";
import fs from "fs";
import jwt from "jsonwebtoken";
import status from "http-status";
import redisClient from "../config/redis.js";
import constants from "../config/constants.js";
import userService from "./userService.js";

const register = async (name, email, password) => {
  const user = await userService.getUserByEmail(email);
  if (user) {
    const error = new Error("이미 존재하는 이메일입니다.");
    error.status = status.BAD_REQUEST;
    throw error;
  }

  // 비밀번호 암호화
  const hashedPassword = await argon2.hash(password);

  // 사용자 생성
  await userService.createUser(name, email, hashedPassword);
};

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    const error = new Error("사용자가 존재하지 않습니다.");
    error.status = status.NOT_FOUND;
    throw error;
  }

  // 암호화된 password 비교
  if (!(await argon2.verify(user.password, password))) {
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.status = status.UNAUTHORIZED;
    throw error;
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

  return { user, accessToken };
};

const logout = async (user) => {
  await redisClient.del(
    `${constants.CACHE.LOGIN_USER}${user.id}`,
    (err, reply) => {
      if (err) {
        const error = new Error("Redis Error");
        error.status = status.FAILED_DEPENDENCY;
        throw error;
      }
      if (reply === 0) {
        const error = new Error("이미 로그아웃된 사용자입니다.");
        error.status = status.UNAUTHORIZED;
        throw error;
      }
    }
  );
};

export default {
  register,
  login,
  logout,
};
