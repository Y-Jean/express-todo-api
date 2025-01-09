"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "tasks",
      [
        {
          content: "맛있게 낮잠자기",
          user_id: 1,
          done: true,
          date: "2024-12-12",
          deadline: null,
          completed_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "기깔나게 점심먹기",
          user_id: 1,
          done: false,
          date: "2024-12-12",
          deadline: null,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "10시 전에 자기",
          user_id: 1,
          done: false,
          date: "2024-12-12",
          deadline: null,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "뽀삐 산책나가서 5km 걷고 오기",
          user_id: 2,
          done: true,
          date: "2024-12-12",
          deadline: null,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "뽀삐 물그릇 갈아주고 사료 새로 사기",
          user_id: 2,
          done: false,
          date: "2024-12-12",
          deadline: null,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "일하기... 진짜... 일하기...",
          user_id: 3,
          done: false,
          date: "2024-12-13",
          deadline: null,
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
