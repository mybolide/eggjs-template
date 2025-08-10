'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: "主键id",
      field: "id"
    },
    createdBy: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "创建人",
      field: "created_by"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "创建时间",
      field: "created_at"
    },
    updatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "更新人",
      field: "updated_by"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "更新时间",
      field: "updated_at"
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "删除时间",
      field: "deleted_at"
    },
    isDeleted: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "是否删除;1 删除 0 未删除 默认为0",
      field: "is_deleted"
    },
    taskId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "任务id",
      field: "task_id"
    },
    stageId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "生产阶段id",
      field: "stage_id"
    },
    question: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "问题",
      field: "question"
    },
    answerValue: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "答案内容",
      field: "answer_value"
    },
    questionId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "问题id",
      field: "questionId"
    }
  };
  const options = {
    tableName: "visit_report_answers",
    comment: "",
    indexes: []
  };
  const VisitReportAnswersModel = sequelize.define("visitReportAnswersModel", attributes, options);
  return VisitReportAnswersModel;
};