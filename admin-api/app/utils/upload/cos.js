// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const COS = require('cos-nodejs-sdk-v5');
const path = require('path');
const cos = new COS({
    SecretId: '', // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    SecretKey: '', // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});

// 存储桶配置
const BUCKET_CONFIG = {
    Bucket: '',
    Region: ''
};

async function uploadFile(file, fileName, folder = 'files') {
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

     return new Promise((resolve, reject) => {
        cos.uploadFile({
            Bucket: BUCKET_CONFIG.Bucket, // 填入您自己的存储桶，必须字段
            Region: BUCKET_CONFIG.Region,  // 存储桶所在地域，例如 ap-beijing，必须字段
            Key: ossKey,  // 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段
            FilePath: file,                // 必须
            SliceSize: 1024 * 1024 * 5,     // 触发分块上传的阈值，超过5MB使用分块上传，非必须
        }, function(err, data) {
            if (err) {
              console.log('上传失败', err);
              reject({
                success: false,
                error: err,
              });
            } else {
              resolve({
                success: true,
                key: ossKey, // 返回存储路径，用于后续获取预签名URL
                url: data.Location // COS返回的完整访问地址
              })
            }
        });
     })
}

/**
 * 获取私有桶文件的预签名URL
 * @param {string} key - 文件在COS中的Key（路径）
 * @param {number} expires - 过期时间（秒），默认1小时
 * @param {string} method - HTTP方法，默认GET
 * @returns {Promise<string>} 预签名URL
 */
async function getSignedUrl(key, expires = 3600, method = 'GET') {
    return new Promise((resolve, reject) => {
        cos.getObjectUrl({
            Bucket: BUCKET_CONFIG.Bucket,
            Region: BUCKET_CONFIG.Region,
            Key: key,
            Sign: true, // 生成带签名的URL
            Expires: expires, // 单位秒
            Method: method
        }, function(err, data) {
            if (err) {
                console.log('获取预签名URL失败', err);
                reject({
                    success: false,
                    error: err
                });
            } else {
                console.log('获取预签名URL成功', data.Url);
                resolve({
                    success: true,
                    url: data.Url,
                    expires: expires
                });
            }
        });
    });
}

/**
 * 批量获取多个文件的预签名URL
 * @param {Array<string>} keys - 文件Key数组
 * @param {number} expires - 过期时间（秒），默认1小时
 * @returns {Promise<Array>} 预签名URL数组
 */
async function getBatchSignedUrls(keys, expires = 3600) {
    try {
        const promises = keys.map(key => getSignedUrl(key, expires));
        const results = await Promise.all(promises);
        return {
            success: true,
            urls: results.map((result, index) => ({
                key: keys[index],
                url: result.success ? result.url : null,
                error: result.success ? null : result.error
            }))
        };
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
}

/**
 * 检查文件是否存在
 * @param {string} key - 文件Key
 * @returns {Promise<boolean>} 文件是否存在
 */
async function checkFileExists(key) {
    return new Promise((resolve) => {
        cos.headObject({
            Bucket: BUCKET_CONFIG.Bucket,
            Region: BUCKET_CONFIG.Region,
            Key: key
        }, function(err, data) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    uploadFile,
    getSignedUrl,
    getBatchSignedUrls,
    checkFileExists
};