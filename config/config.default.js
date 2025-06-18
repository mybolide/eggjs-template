/* eslint valid-jsdoc: "off" */

const I18n = require('i18n');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
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
  config.middleware = [];

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
    host: 'localhost',
    port: 3306,
    database: 'test',
    username: 'root',
    password: '123456',
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
