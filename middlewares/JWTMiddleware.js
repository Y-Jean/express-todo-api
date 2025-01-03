import { User } from "../models/index.js";
import fs from "fs";
import redisClient from "../config/redis.js";
import constants from "../config/constants.js";
import jwt from "jsonwebtoken";

const publicKey = fs.readFileSync(`config/${constants.JWT.PUBLIC_KEY}`);

// JWT 검증 미들웨어
const verifyJWT = (req, res, next) => {
  // Authorization 헤더에서 Bearer 토큰 추출
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "토큰이 없습니다." });
  }

  // JWT 토큰 디코딩
  const decoded = jwt.verify(token, publicKey, {
    algorithms: [constants.JWT.ALG],
  });

  // 디코딩된 정보를 바탕으로 사용자 재조회
  const user = User.findOne({
    where: { email: decoded.email, id: decoded.user_id },
  });
  if (!user) {
    return res.status(403).json({ message: "존재하지 않는 사용자입니다." });
  }

  const cacheKey = `${constants.CACHE.LOGIN_USER}${user.id}`;

  // 캐시에 있는 로그인 정보와 비교
  redisClient.exists(cacheKey, (err, storedToken) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (storedToken !== token) {
      return res
        .status(410)
        .json({ message: "다른 브라우저에서 로그인되었습니다." });
    }
  });

  // 세션 갱신
  redisClient.setEx(cacheKey, constants.CACHE_EXPIRE, token);

  // 사용자 정보를 request 객체에 설정
  req.user = user;

  console.log(user);

  next();
};

export default verifyJWT;
