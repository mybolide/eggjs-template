# 阿里云OSS上传功能使用指南

## 功能概述

本项目集成了阿里云OSS文件上传功能，支持单个文件上传、批量上传、文件删除等操作。

## 配置说明

### 1. 环境变量配置

在 `.env` 文件中配置以下OSS相关参数：

```bash
# 阿里云OSS配置
OSS_REGION=oss-cn-hangzhou              # OSS区域
OSS_ACCESS_KEY_ID=your-access-key-id    # 访问密钥ID
OSS_ACCESS_KEY_SECRET=your-access-key-secret  # 访问密钥Secret
OSS_BUCKET=your-bucket-name             # 存储桶名称
OSS_CUSTOM_DOMAIN=                      # 自定义域名（可选）
```

### 2. 获取阿里云OSS配置信息

1. 登录阿里云控制台
2. 开通对象存储OSS服务
3. 创建Bucket
4. 获取AccessKey和AccessKeySecret
5. 记录Bucket名称和区域信息

## API接口说明

### 1. 上传单个图片

```http
POST /fed-api/v1-0/upload/image
Content-Type: multipart/form-data
Headers: fed-token: your-token

Form Data:
- file: 图片文件
- folder: 存储文件夹（可选，默认images）
```

**响应示例：**
```json
{
  "code": 1,
  "msg": "图片上传成功",
  "data": {
    "url": "https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/avatar_1640995200000.jpg",
    "name": "avatar_1640995200000.jpg",
    "ossKey": "images/avatar_1640995200000.jpg",
    "size": 102400
  }
}
```

### 2. 批量上传图片

```http
POST /fed-api/v1-0/upload/images
Content-Type: multipart/form-data
Headers: fed-token: your-token

Form Data:
- files: 图片文件数组
- folder: 存储文件夹（可选，默认images）
```

**响应示例：**
```json
{
  "code": 1,
  "msg": "批量上传完成，成功2个，失败0个",
  "data": {
    "total": 2,
    "success": 2,
    "failed": 0,
    "results": [
      {
        "filename": "image1.jpg",
        "success": true,
        "url": "https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/image1_1640995200000.jpg",
        "name": "image1_1640995200000.jpg",
        "ossKey": "images/image1_1640995200000.jpg",
        "size": 102400
      }
    ]
  }
}
```

### 3. 删除文件

```http
DELETE /fed-api/v1-0/upload/file
Content-Type: application/json
Headers: fed-token: your-token

Body:
{
  "ossKey": "images/avatar_1640995200000.jpg"
}
```

### 4. 批量删除文件

```http
DELETE /fed-api/v1-0/upload/files
Content-Type: application/json
Headers: fed-token: your-token

Body:
{
  "ossKeys": [
    "images/image1_1640995200000.jpg",
    "images/image2_1640995200000.jpg"
  ]
}
```

### 5. 获取文件信息

```http
GET /fed-api/v1-0/upload/file/info?ossKey=images/avatar_1640995200000.jpg
Headers: fed-token: your-token
```

### 6. 生成签名URL

```http
POST /fed-api/v1-0/upload/signed-url
Content-Type: application/json
Headers: fed-token: your-token

Body:
{
  "ossKey": "images/avatar_1640995200000.jpg",
  "expires": 3600
}
```

## 文件限制

### 支持的图片格式
- JPG/JPEG
- PNG
- GIF
- BMP
- WebP

### 文件大小限制
- 单个图片：最大5MB
- 批量上传：最多10个文件

### 存储路径规则
- 默认存储在 `images/` 文件夹下
- 文件名格式：`原文件名_时间戳.扩展名`
- 支持自定义存储文件夹

## 使用示例

### 前端上传示例（JavaScript）

```javascript
// 单个文件上传
async function uploadImage(file, folder = 'images') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  
  const response = await fetch('/fed-api/v1-0/upload/image', {
    method: 'POST',
    headers: {
      'fed-token': 'your-token'
    },
    body: formData
  });
  
  return response.json();
}

// 批量文件上传
async function uploadImages(files, folder = 'images') {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  formData.append('folder', folder);
  
  const response = await fetch('/fed-api/v1-0/upload/images', {
    method: 'POST',
    headers: {
      'fed-token': 'your-token'
    },
    body: formData
  });
  
  return response.json();
}
```

### 服务端使用示例

```javascript
// 在其他控制器中使用OSS上传
const OSSUpload = require('../utils/upload/oss');

class SomeController extends BaseController {
  async someMethod() {
    const { ctx } = this;
    const ossUpload = new OSSUpload(ctx.app.config.oss);
    
    // 上传文件
    const result = await ossUpload.uploadImage(fileBuffer, fileName, 'avatars');
    
    if (result.success) {
      // 保存文件URL到数据库
      // ...
    }
  }
}
```

## 安全考虑

1. **访问控制**：所有上传接口都需要认证token
2. **文件验证**：严格检查文件类型和大小
3. **路径安全**：防止路径遍历攻击
4. **临时文件清理**：上传完成后自动清理临时文件

## 错误处理

常见错误及解决方案：

1. **OSS配置错误**：检查AccessKey、Bucket等配置
2. **文件格式不支持**：只允许指定的图片格式
3. **文件过大**：检查文件大小限制
4. **网络超时**：检查网络连接和OSS服务状态

## 注意事项

1. 确保阿里云OSS Bucket有正确的读写权限
2. 生产环境请使用HTTPS域名
3. 定期检查OSS存储费用
4. 建议设置OSS生命周期规则管理文件
5. 对于私有文件，使用签名URL访问

## 相关链接

- [阿里云OSS官方文档](https://help.aliyun.com/product/31815.html)
- [ali-oss SDK文档](https://github.com/ali-sdk/ali-oss) 