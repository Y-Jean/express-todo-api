import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Task extends Model {
  static associate(db) {
    Task.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "작업 id",
    },
    content: {
      type: DataTypes.TEXT,
      comment: "작업 내용",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      comment: "사용자 id",
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "완료 여부",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "작업일",
    },
    deadline: {
      type: DataTypes.DATE,
      comment: "작업 완료 제한 시간",
    },
    completedAt: {
      type: DataTypes.DATE,
      field: "completed_at",
      comment: "실제 완료 시간",
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
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Task",
    tableName: "tasks",
  }
);

export default Task;
