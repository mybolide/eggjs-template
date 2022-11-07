// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUpload = require('../../../app/model/upload');

declare module 'egg' {
  interface IModel {
    Upload: ReturnType<typeof ExportUpload>;
  }
}
