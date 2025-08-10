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
      comment: "id",
      field: "id"
    },
    createdBy: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "创建人id",
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
      comment: "更新人id",
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
    code: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "应用编码",
      field: "code"
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "系统名称",
      field: "name"
    },
    icon: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "图标",
      field: "icon"
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "描述",
      field: "description"
    },
    orders: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "排序",
      field: "orders"
    },
    prefix: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "前缀",
      field: "prefix"
    },
    appType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "应用类型0内部 1微前端 2普通项目",
      field: "app_type"
    },
    isSuperApp: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "是否是超级管理系统0否1是",
      field: "is_super_app"
    },
    isDeleted: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_deleted"
    }
  };
  const options = {
    tableName: "sys_app",
    comment: "",
    indexes: []
  };
  const SysAppModel = sequelize.define("sysAppModel", attributes, options);
  return SysAppModel;
};