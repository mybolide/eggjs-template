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
      comment: "主键",
      field: "id"
    },
    accountId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "用户id",
      field: "account_id"
    },
    roleId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "角色id",
      field: "role_id"
    },
    roleType: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "角色类型:ADMIN,ORDINARY",
      field: "role_type"
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "删除时间",
      field: "deleted_at"
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
    tableName: "sys_account_role",
    comment: "",
    indexes: []
  };
  const SysAccountRoleModel = sequelize.define("sysAccountRoleModel", attributes, options);
  return SysAccountRoleModel;
};