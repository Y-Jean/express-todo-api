"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create users table
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "사용자 id",
      },
      name: {
        type: Sequelize.STRING,
        comment: "이름",
      },
      email: {
        type: Sequelize.STRING,
        comment: "이메일",
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        comment: "비밀번호",
      },
      failCount: {
        type: Sequelize.SMALLINT,
        field: "fail_count",
        defaultValue: 0,
        comment: "로그인 실패 횟수",
      },
      lastLoginAt: {
        type: Sequelize.DATE,
        field: "last_login_at",
        comment: "마지막 로그인 시간",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "updated_at",
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });

    //create tasks table
    await queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "작업 id",
      },
      content: {
        type: Sequelize.TEXT,
        comment: "작업 내용",
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        comment: "사용자 id",
      },
      done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: "완료 여부",
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: "작업일",
      },
      deadline: {
        type: Sequelize.DATE,
        comment: "작업 완료 제한 시간",
      },
      completedAt: {
        type: Sequelize.DATE,
        field: "completed_at",
        comment: "실제 완료 시간",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "updated_at",
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("tasks");
    await queryInterface.dropTable("users");
  },
};
