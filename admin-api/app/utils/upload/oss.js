'use strict';

const OSS = require('ali-oss');
const path = require('path');
const fs = require('fs');

/**
 * 阿里云OSS上传工具
 * 普通函数方式
 */

// OSS客户端配置 - 从环境变量读取
const client = new OSS({
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
});

/**
 * 上传文件
 * @param {Buffer|Stream|String} file 文件内容
 * @param {String} fileName 文件名
 * @param {String} folder 存储文件夹，默认 'files'
 * @return {Object} 上传结果
 */
async function uploadFile(file, fileName, folder = 'files') {
  try {
    // 生成日期路径 (YYYY/MM/DD)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePath = `${year}/${month}/${day}`;
    
    // 生成唯一文件名
    const timestamp = Date.now();
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    const uniqueFileName = `${baseName}_${timestamp}${ext}`;
    
    // 构建OSS存储路径：folder/年/月/日/文件名
    const ossKey = `${folder}/${datePath}/${uniqueFileName}`;
    
    // 上传文件
    const result = await client.put(ossKey, file);
    return {
      success: true,
      url: result.url
    };
  } catch (error) {
    console.info(error)
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 生成签名URL（用于私有访问）
 * @param {String} ossKey OSS存储路径
 * @param {Number} expires 过期时间（秒），默认1小时
 * @return {String} 签名URL
 */
async function generateSignedUrl(ossKey, expires = 3600) {
  try {
    const url = client.signatureUrl(ossKey, { expires });
    return url;
  } catch (error) {
    console.error('生成签名URL失败:', error);
    return null;
  }
}

module.exports = {
  uploadFile,
  generateSignedUrl,
};
