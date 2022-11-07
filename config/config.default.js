/* eslint valid-jsdoc: "off" */

'use strict';

const Op = require('sequelize').Op;
const I18n = require('i18n');
const path = require('path');
const { DBConfig, RedisConfig } = require('./dbconfig');
const runtimeEnv = process.env.EGG_SERVER_ENV;
const env = runtimeEnv === 'prod' ? 'prod' : 'test';

// 配置i18n
I18n.configure({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  directory: __dirname + '/locale',
});

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_fed_server_api';

  // add your middleware config here
  config.middleware = ['errorHandler', 'authLogin'];
  config.logger = {
    dir: path.join(__dirname, '../logs'),
  };
  config.redis = RedisConfig[env]
  config.redlock9 = {
    logger: app => e => app.info(e.message),
    options: { // redlock自带选项
      driftFactor: 0.01,
      retryCount: 5,
      retryDelay: 200,
      retryJitter: 50,
    }
  }
  config.sequelize = {
    dialect: 'mysql',
    host: DBConfig[env].host,
    port: DBConfig[env].port,
    username: DBConfig[env].user,
    password: DBConfig[env].password,
    database: DBConfig[env].database,
    define: {
      // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: true, // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: {
      // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast (field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    // 使用默认运算符别名
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col,
    },
  };

  config.cluster = {
    listen: {
      port: 10881,
    },
  };
  config.validate = {
    translate () {
      const args = Array.prototype.slice.call(arguments);
      return I18n.__.apply(I18n, args);
    },
  };
  config.multipart = {
    fileExtensions: ['.sh', '.woff', '.pdf', '.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx', '.mov', '.zip', '.mkv', '.ttf', '.woff', '.map'], // 增加对 apk 扩展名的文件支持
    fileSize: '2048mb',
    mode: 'file',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };

  config.cors = {
    origin: ctx => ctx.get('origin'),
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
