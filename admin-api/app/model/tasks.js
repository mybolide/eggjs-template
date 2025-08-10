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
    code: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "任务编号",
      field: "code"
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "任务标题",
      field: "name"
    },
    farmId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "农场id",
      field: "farm_id"
    },
    accountId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id",
      field: "account_id"
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: "任务状态;1 待开始 2 进行中 3 已提交 4 待审核 5 完成 6 审核驳回 7 疑似作弊 8 过期",
      field: "status"
    },
    plannedTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "预计开始时间",
      field: "planned_time"
    },
    visitDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "访问日期",
      field: "visit_date"
    },
    timeSpentOnFieldMinutes: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "在田间花费的时间(分钟)",
      field: "time_spent_on_field_minutes"
    },
    currentStageId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "当前生产阶段id, 关联 stage_categories.id",
      field: "current_stage_id"
    },
    summaryOfActivities: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "活动/观察摘要",
      field: "summary_of_activities"
    },
    statusIndicator: {
      type: DataTypes.STRING(24),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "颜色编码的状态指示器 (e.g., green, yellow, red)",
      field: "status_indicator"
    },
    descriptionOfChallenges: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "挑战描述",
      field: "description_of_challenges"
    },
    recommendedActions: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "建议的行动/干预",
      field: "recommended_actions"
    },
    previousReportActedOn: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "之前的报告是否已处理？ 1-是, 0-否",
      field: "previous_report_acted_on"
    },
    photos: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "照片URL列表",
      field: "photos"
    },
    latitude: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "GPS纬度",
      field: "latitude"
    },
    longitude: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "GPS经度",
      field: "longitude"
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "开始时间",
      field: "start_time"
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "结束时间",
      field: "end_time"
    }
  };
  const options = {
    tableName: "tasks",
    comment: "",
    indexes: []
  };
  const TasksModel = sequelize.define("tasksModel", attributes, options);
  return TasksModel;
};