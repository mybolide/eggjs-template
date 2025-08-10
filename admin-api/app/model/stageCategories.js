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
    name: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "阶段名称",
      field: "name"
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "排序",
      field: "sort"
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "状态;1 启用 0 禁用",
      field: "status"
    }
  };
  const options = {
    tableName: "stage_categories",
    comment: "",
    indexes: []
  };
  const StageCategoriesModel = sequelize.define("stageCategoriesModel", attributes, options);
  return StageCategoriesModel;
};