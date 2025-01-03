import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 브라우저 환경 전역 변수
        ...globals.node, // Node.js 전역 변수들을 추가
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      eqeqeq: "error",
      semi: ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];
