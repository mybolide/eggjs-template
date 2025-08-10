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
      comment: "角色id",
      field: "id"
    },
    appId: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "应用id",
      field: "app_id"
    },
    code: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "角色编码",
      field: "code"
    },
    type: {
      type: DataTypes.INTEGER(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "角色类型:角色类型:0 管理角色,1普通角色",
      field: "type"
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "角色名称",
      field: "name"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "角色描述",
      field: "description"
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
      type: DataTypes.STRING(32),
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
      type: DataTypes.STRING(32),
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
    tableName: "sys_role",
    comment: "",
    indexes: []
  };
  const SysRoleModel = sequelize.define("sysRoleModel", attributes, options);
  return SysRoleModel;
};