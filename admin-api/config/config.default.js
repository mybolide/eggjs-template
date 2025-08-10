/* eslint valid-jsdoc: "off" */

const I18n = require('i18n');
const { DBConfig, RedisConfig } = require("./dbconfig");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  let env = appInfo.env;

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 初始化 I18n 配置
  I18n.configure({
    locales: ['zh-CN', 'en-US'],
    defaultLocale: 'zh-CN',
    directory: require('path').join(__dirname, 'locale'),
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1750057225659_1070';

  // add your middleware config here
  config.middleware = ['errorHandler', 'authLogin'];

   // CSRF 配置，加入下面这段
  config.security = {
    csrf: {
      enable: false
    },
  };

  // 配置 validate 插件使用 i18n 翻译
  config.validate = {
    translate() {
      const args = Array.prototype.slice.call(arguments);
      return I18n.__.apply(I18n, args);
    }
  };



  // sequelize 配置
  config.sequelize = {
    dialect: 'mysql',
    host: DBConfig[env].host,
    port: DBConfig[env].port,
    database: DBConfig[env].database,
    username: DBConfig[env].user,
    password: DBConfig[env].password,
    define: {
      // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: true, // 防止驼峰式字段被默认转为下划线
      // deletedAt: 'is_deleted',
      hooks: {
        beforeFind(instance, options) {
          instance.paranoid = false;
          if (!instance.where) {
            instance.where = {};
          }
          instance.where.isDeleted = 0;
        },

        beforeDestroy: function (instance, options) {
          instance.isDeleted = 1;
        },
      },
    },
    dialectOptions: {
      // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    // 设置时区为东八区
    timezone: '+08:00'
  };

  // redis 配置
  config.redis = RedisConfig[env];

  // cors 配置
  config.cors = {
    origin: '*',
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  // 文件上传配置
  config.multipart = {
    mode: 'file', // 文件模式
    autoFields: false, // 不自动获取字段
    defaultCharset: 'utf8',
    fieldNameSize: 100,
    fieldSize: '100kb',
    fields: 10,
    fileSize: '10mb', // 单个文件大小限制
    files: 10, // 最大文件数量
    fileExtensions: [
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', // 图片格式
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', // 文档格式
      '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', // 视频格式
      '.mp3', '.wav', '.flac', '.aac', // 音频格式
    ],
    whitelist: [
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp',
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv',
      '.mp3', '.wav', '.flac', '.aac',
    ],
  };

  // OSS 配置
  config.oss = {
    region: process.env.OSS_REGION || 'oss-cn-hangzhou', // OSS区域
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || 'your-access-key-id',
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || 'your-access-key-secret',
    bucket: process.env.OSS_BUCKET || 'your-bucket-name',
    // 可选配置
    customDomain: process.env.OSS_CUSTOM_DOMAIN || '', // 自定义域名
    internal: false, // 是否使用内网访问
    secure: true, // 是否使用HTTPS
    timeout: 60000, // 超时时间
  };

  // 日志配置
  config.logger = {
    level: 'INFO',
    consoleLevel: 'INFO',
    allowDebugAtProd: false,
    dir: `${appInfo.root}/logs/${appInfo.name}`,
    // 日志轮转配置
    rotateLogDirs: [],
    maxDays: 3, // 保留3天的日志
    maxFiles: 10, // 最多保留10个文件
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
