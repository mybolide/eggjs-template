'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;
  const attributes = {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键",
      field: "id"
    },
    token: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "token",
      field: "token"
    },
    appKey: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "appkey",
      field: "app_key"
    },
    appId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "appid",
      field: "app_id"
    },
    expiresTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "失效时间",
      field: "expires_time"
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "备注",
      field: "remarks"
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
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "创建人id",
      field: "created_by"
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
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "更新人id",
      field: "updated_by"
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "删除时间",
      field: "deleted_at"
    }
  };
  const options = {
    tableName: "sys_other_token",
    comment: "",
    indexes: []
  };
  const SysOtherTokenModel = sequelize.define("sysOtherTokenModel", attributes, options);
  return SysOtherTokenModel;
};