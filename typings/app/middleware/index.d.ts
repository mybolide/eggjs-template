// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthLogin = require('../../../app/middleware/authLogin');
import ExportErrorHandler = require('../../../app/middleware/errorHandler');

declare module 'egg' {
  interface IMiddleware {
    authLogin: typeof ExportAuthLogin;
    errorHandler: typeof ExportErrorHandler;
  }
}
