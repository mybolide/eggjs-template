/* eslint valid-jsdoc: "off" */


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

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
  config.i18n = {
    defaultLocale: 'zh-CN',
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
