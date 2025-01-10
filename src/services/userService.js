import argon2 from "argon2";
import db from "../models/index.js";
import redisClient from "../config/redis.js";
import constants from "../config/constants.js";

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return db.User.findOne({ where: { email } });
};

/**
 * Get user by id
 * @param {integer} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return db.User.findByPk(id);
};

/**
 * Create a User
 * @param {string} email
 * @param {string} name
 * @param {string} hashedPassword
 * @returns {Promise<User>}
 */
const createUser = async (name, email, hashedPassword) => {
  await db.User.create({
    name,
    email,
    password: hashedPassword,
  });
};

/**
 * Delete a User
 * @param {User} user
 */
const deleteUser = async (user) => {
  await redisClient.del(`${constants.CACHE.LOGIN_USER}${user.id}`);
  await db.User.destroy({
    where: { id: user.id },
  });
};

/**
 * Update user password
 * @param {User} user
 * @param {string} newPassword
 */
const updatePassword = async (user, newPassword) => {
  // 이전 비밀번호와 비교
  if (await argon2.verify(user.password, newPassword)) {
    const error = new Error("변경하려는 비밀번호가 이전 비밀번호와 같습니다.");
    error.status = status.BAD_REQUEST;
    throw error;
  }

  // 비밀번호 암호화
  const hashedNewPassword = await argon2.hash(newPassword);

  // 비밀번호 업데이트
  await user.update({
    password: hashedNewPassword,
  });
};

/**
 * Update user profile
 * @param {User} user
 * @param {Object} body
 */
const updateProfile = async (user, body) => {
  // 사용자 업데이트
  await user.update({
    name: body.name,
  });
};

export default {
  getUserByEmail,
  getUserById,
  createUser,
  deleteUser,
  updatePassword,
  updateProfile,
};
