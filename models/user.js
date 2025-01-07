import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "사용자 id",
    },
    name: {
      type: DataTypes.STRING,
      comment: "이름",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      comment: "이메일",
    },
    password: {
      type: DataTypes.STRING,
      comment: "비밀번호",
    },
    failCount: {
      type: DataTypes.TINYINT,
      field: "fail_count",
      defaultValue: 0,
      comment: "로그인 실패 횟수",
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_login_at",
      comment: "마지막 로그인 시간",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at",
    },
  },
  {
    sequelize,
    paranoid: true, // soft delete
    timestamps: true,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
