// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-watcher';
import 'egg-multipart';
import 'egg-security';
import 'egg-development';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-static';
import 'egg-jsonp';
import 'egg-view';
import 'egg-swagger-doc-feat';
import 'egg-mysql';
import 'egg-validate';
import 'egg-sequelize';
import 'egg-cors';
import 'egg-redis';
import 'egg-redlock-9';
import { EggPluginItem } from 'egg';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    swaggerdoc?: EggPluginItem;
    mysql?: EggPluginItem;
    validate?: EggPluginItem;
    sequelize?: EggPluginItem;
    cors?: EggPluginItem;
    redis?: EggPluginItem;
    redlock9?: EggPluginItem;
  }
}