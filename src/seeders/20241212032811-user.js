"use strict";
const argon2 = require("argon2");

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    // 비밀번호 해싱
    const password = await argon2.hash("Todo1234!@");

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "김사람",
          email: "john.doe@example.com",
          password: password,
          fail_count: 0,
          last_login_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "이사람",
          email: "jane.smith@example.com",
          password: password,
          fail_count: 0,
          last_login_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "저사람",
          email: "alice.johnson@example.com",
          password: password,
          fail_count: 0,
          last_login_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "박사람",
          email: "parksaa@example.com",
          password: password,
          fail_count: 0,
          last_login_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "유사람",
          email: "you@example.com",
          password: password,
          fail_count: 0,
          last_login_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
