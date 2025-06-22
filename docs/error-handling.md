# 错误处理机制说明

## 概述

本项目实现了统一的错误处理机制，所有错误都会被中间件拦截并统一输出为 `{code: 0, msg: '错误信息'}` 格式。

## 架构组成

### 1. 错误处理中间件 (`app/middleware/errorHandler.js`)

- 拦截所有未捕获的错误
- 统一错误响应格式
- 记录错误日志
- 开发环境下返回详细错误堆栈

### 2. 错误类 (`app/utils/errorHandler.js`)

提供了多种标准化的错误类：

- `AppError`: 基础错误类
- `BusinessError`: 业务错误 (400)
- `ValidationError`: 参数验证错误 (400)
- `AuthError`: 权限错误 (403)
- `NotFoundError`: 资源不存在错误 (404)

### 3. 基础控制器 (`app/framework/BaseController.js`)

扩展了错误处理方法：

- `throwBusinessError(message)`: 抛出业务错误
- `throwAuthError(message)`: 抛出权限错误
- `throwNotFoundError(message)`: 抛出资源不存在错误
- `validateParams(rule, data)`: 参数验证（失败时抛出ValidationError）

## 使用方法

### 1. 在控制器中使用

```javascript
const BaseController = require("../framework/BaseController");

class MyController extends BaseController {
    async someMethod() {
        // 参数验证
        await this.validateParams(rule, data);
        
        // 业务逻辑验证
        if (!someCondition) {
            this.throwBusinessError('业务条件不满足');
        }
        
        // 权限验证
        if (!hasPermission) {
            this.throwAuthError('权限不足');
        }
        
        // 资源存在性验证
        if (!resource) {
            this.throwNotFoundError('资源不存在');
        }
        
        // 成功响应
        this.success(data);
    }
}
```

### 2. 直接抛出错误

```javascript
// 任何地方都可以直接抛出错误，中间件会自动捕获
throw new BusinessError('自定义业务错误');
throw new ValidationError('参数验证失败');
throw new Error('系统错误');
```

### 3. 异步错误处理

```javascript
async someAsyncMethod() {
    try {
        await someAsyncOperation();
    } catch (error) {
        // 重新抛出错误，让中间件处理
        throw error;
    }
}
```

## 响应格式

### 成功响应
```json
{
    "code": 1,
    "msg": "操作成功",
    "data": {...}
}
```

### 错误响应
```json
{
    "code": 0,
    "msg": "错误信息",
    "data": {}
}
```

### 开发环境错误响应（包含堆栈信息）
```json
{
    "code": 0,
    "msg": "错误信息",
    "data": {},
    "stack": "错误堆栈信息"
}
```

## 测试接口

项目提供了测试控制器 `TestErrorController` 来演示各种错误处理场景：

- `GET /test/business-error`: 测试业务错误
- `POST /test/validation-error`: 测试参数验证错误
- `GET /test/auth-error`: 测试权限错误
- `GET /test/not-found-error`: 测试资源不存在错误
- `GET /test/system-error`: 测试系统错误
- `GET /test/async-error`: 测试异步错误
- `GET /test/success`: 测试成功响应

## 最佳实践

1. **使用标准错误类**: 优先使用提供的标准错误类，而不是直接抛出 `Error`
2. **提供有意义的错误信息**: 错误信息应该清晰明确，便于调试
3. **记录错误日志**: 中间件会自动记录错误日志，无需手动记录
4. **参数验证**: 使用 `validateParams` 方法进行参数验证
5. **业务逻辑验证**: 在业务逻辑中使用 `throwBusinessError` 抛出业务错误

## 配置

错误处理中间件已在 `config/config.default.js` 中注册：

```javascript
config.middleware = ['errorHandler'];
```

中间件会按照注册顺序执行，确保错误处理中间件能够捕获所有后续中间件和路由处理中的错误。 