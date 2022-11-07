// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUploadController = require('../../../app/controller/uploadController');

declare module 'egg' {
  interface IController {
    uploadController: ExportUploadController;
  }
}
