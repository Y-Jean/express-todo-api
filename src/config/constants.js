// config/constants.js
const CONSTANTS = {
  APP_NAME: "Express Todo App",
  JWT_EXPIRE: "1d",
  CACHE_EXPIRE: { EX: 1200 },
  MAX_LOGIN_ATTEMPTS: 5,
  JWT: {
    ALG: "ES256",
    PUBLIC_KEY: "keys/public.pem",
    PRIVATE_KEY: "keys/private.pem",
    EXPIRE: "1d",
  },
  CACHE: {
    LOGIN_USER: "login_user_cache:",
  },
};

export default CONSTANTS;
