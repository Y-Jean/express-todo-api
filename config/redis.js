import dotenv from "dotenv";
import redis from "redis";

dotenv.config();

// Redis 클라이언트 생성 및 설정
const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

export default client;
