import db from "../models/index.js";

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

export default {
  getUserByEmail,
  getUserById,
  createUser,
};
