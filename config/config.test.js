/* eslint valid-jsdoc: "off" */

'use strict';

const I18n = require('i18n');

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
  const config = (exports = {});

  config.swaggerdoc = {
    dirScanner: './app/controller',
    basePath: '',
    apiInfo: {
      title: '超境汽车',
      description: '超境汽车',
      version: '1.0.0',
      docExpansion: 'none',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      'x-token': {
        type: 'string',
        name: 'x-token',
        in: 'header',
      },
    },
    enableSecurity: false,
    enableValidate: true,
    routerMap: true, // 根据文档自动生成路由
    enable: true,
    docExpansion: 'none',
  };
  config.cluster = {
    listen: {
      port: 10882,
    },
  };
  return {
    ...config,
  };
};

