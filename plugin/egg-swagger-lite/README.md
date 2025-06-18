# egg-swagger-lite

📚 **轻量级API文档生成插件** - 基于注解自动生成OpenAPI 3.0文档和Swagger UI界面

## 📋 功能特性

- 📝 **注解驱动** - 通过多种注解自动生成API文档
- 🎯 **OpenAPI 3.0** - 生成标准的OpenAPI 3.0规范文档
- 🌐 **Swagger UI** - 集成完整的Swagger UI交互界面
- 🔄 **自动路由** - 解析注解的同时自动注册路由
- 📊 **智能分组** - 基于Controller自动分组API
- 🎨 **零配置** - 插件启用后自动工作，无需额外配置
- 🔗 **Contract集成** - 自动关联验证规则生成请求/响应模型

## 🛠️ 安装配置

### 1. 启用插件

在 `config/plugin.js` 中启用插件：

```javascript
// config/plugin.js
const path = require('path');

module.exports = {
  swaggerLite: {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-swagger-lite')
  }
};
```

### 2. 无需额外配置

插件启用后会自动：
- 扫描 `app/controller/` 目录解析注解
- 加载 `app/contract/` 目录的验证规则
- 生成OpenAPI文档并提供Swagger UI

## 🌐 访问入口

启动应用后，可以通过以下地址访问：

- **Swagger UI**: http://localhost:7001/docs
- **OpenAPI JSON**: http://localhost:7001/swagger.json
- **API文档页面**: http://localhost:7001/docs/index.html?url=/swagger.json

## 📖 使用方法

### 基础注解示例

```javascript
// app/controller/user.js
const BaseController = require('../framework/BaseController');

/**
 * @Controller 用户管理 user-controller
 */
class UserController extends BaseController {
  /**
   * @Summary 获取用户列表
   * @Description 分页获取系统中的用户列表
   * @Router get /api/users
   * @Request query integer page eg:1 页码
   * @Request query integer limit eg:10 每页数量
   * @Request header string authorization 认证token
   * @Response 200 JsonResult 操作成功
   */
  async list() {
    const { page = 1, limit = 10 } = this.ctx.query;
    const data = await this.service.user.list(page, limit);
    this.success(data);
  }

  /**
   * @Summary 创建用户
   * @Description 创建新的用户账户
   * @Router post /api/users
   * @Request header string authorization 认证token
   * @Request body userForm 用户信息
   * @Response 200 JsonResult 创建成功
   * @Response 400 JsonResult 参数错误
   */
  async create() {
    const payload = this.ctx.request.body;
    const result = await this.service.user.create(payload);
    this.success(result);
  }

  /**
   * @Summary 获取用户详情
   * @Description 根据用户ID获取详细信息
   * @Router get /api/users/{id}
   * @Request path integer id eg:1 用户ID
   * @Request header string authorization 认证token
   * @Response 200 JsonResult 操作成功
   * @Response 404 JsonResult 用户不存在
   */
  async show() {
    const { id } = this.ctx.params;
    const user = await this.service.user.findById(id);
    this.success(user);
  }

  /**
   * @Summary 更新用户
   * @Description 更新指定用户的信息
   * @Router put /api/users/{id}
   * @Request path integer id eg:1 用户ID
   * @Request header string authorization 认证token
   * @Request body userForm 用户信息
   * @Response 200 JsonResult 更新成功
   * @Response 404 JsonResult 用户不存在
   */
  async update() {
    const { id } = this.ctx.params;
    const payload = this.ctx.request.body;
    const result = await this.service.user.update(id, payload);
    this.success(result);
  }

  /**
   * @Summary 删除用户
   * @Description 删除指定的用户账户
   * @Router delete /api/users/{id}
   * @Request path integer id eg:1 用户ID
   * @Request header string authorization 认证token
   * @Response 200 JsonResult 删除成功
   * @Response 404 JsonResult 用户不存在
   */
  async destroy() {
    const { id } = this.ctx.params;
    await this.service.user.delete(id);
    this.success();
  }
}

module.exports = UserController;
```

### Contract验证规则集成

定义请求体和响应体的数据结构：

```javascript
// app/contract/user.js
module.exports = {
  // 用户表单验证规则
  userForm: {
    name: { 
      type: 'string', 
      required: true, 
      description: '用户姓名',
      example: '张三'
    },
    email: { 
      type: 'string', 
      required: true, 
      description: '邮箱地址',
      example: 'zhangsan@example.com'
    },
    age: { 
      type: 'integer', 
      required: false, 
      min: 1, 
      max: 120,
      description: '年龄',
      example: 25
    },
    status: { 
      type: 'enum', 
      values: ['active', 'inactive'], 
      required: true,
      description: '用户状态',
      example: 'active'
    }
  }
};
```

```javascript
// app/contract/jsonResult.js
module.exports = {
  // 统一响应格式
  JsonResult: {
    code: { 
      type: 'integer', 
      description: '状态码，1表示成功，0表示失败',
      example: 1 
    },
    msg: { 
      type: 'string', 
      description: '响应消息',
      example: '操作成功'
    },
    data: { 
      type: 'object', 
      description: '响应数据',
      example: {} 
    }
  }
};
```

## 🎯 注解语法参考

### @Controller 语法

定义控制器的基本信息，用于文档分组：

```javascript
/**
 * @Controller {name} {tag}
 */
```

**参数说明：**
- `name`: 控制器名称（显示在Swagger UI中）
- `tag`: 控制器标识（用于内部分组）

**示例：**
```javascript
/**
 * @Controller 用户管理 user-controller
 */
```

### @Router 语法

定义HTTP路由信息：

```javascript
/**
 * @Router {method} {path}
 */
```

**参数说明：**
- `method`: HTTP方法 (get/post/put/delete/patch等)
- `path`: 路由路径，支持动态参数 `{param}`

**示例：**
```javascript
/**
 * @Router get /api/users/{id}
 * @Router post /api/users
 */
```

### @Summary 语法

定义API的简短描述：

```javascript
/**
 * @Summary {description}
 */
```

### @Description 语法

定义API的详细描述：

```javascript
/**
 * @Description {detailed_description}
 */
```

### @Request 语法

定义请求参数：

```javascript
/**
 * @Request {location} {type} {name} {description}
 */
```

**参数说明：**
- `location`: 参数位置
  - `query` - URL查询参数
  - `path` - 路径参数
  - `header` - 请求头
  - `body` - 请求体（关联Contract）
- `type`: 参数类型 (string/integer/boolean等)
- `name`: 参数名称
- `description`: 参数描述

**示例：**
```javascript
/**
 * @Request query integer page eg:1 页码
 * @Request path integer id eg:1 用户ID
 * @Request header string authorization 认证token
 * @Request body userForm 用户信息
 */
```

### @Response 语法

定义响应信息：

```javascript
/**
 * @Response {status} {type} {description}
 */
```

**参数说明：**
- `status`: HTTP状态码 (200/400/404/500等)
- `type`: 响应类型（关联Contract）
- `description`: 响应描述

**示例：**
```javascript
/**
 * @Response 200 JsonResult 操作成功
 * @Response 400 JsonResult 参数错误
 * @Response 404 JsonResult 资源不存在
 */
```

## 📊 工作原理

1. **扫描阶段** - 应用启动时扫描所有Controller文件
2. **解析阶段** - 解析文件中的各种注解信息
3. **路由注册** - 自动注册路由到Express路由器
4. **Contract加载** - 加载验证规则用于文档生成
5. **文档构建** - 构建符合OpenAPI 3.0规范的JSON文档
6. **UI服务** - 提供Swagger UI静态资源服务

## 🎨 生成的文档结构

插件会生成包含以下信息的OpenAPI文档：

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Egg Swagger API",
    "version": "1.0.0"
  },
  "tags": [
    {
      "name": "用户管理",
      "description": "user-controller"
    }
  ],
  "paths": {
    "/api/users": {
      "get": {
        "tags": ["用户管理"],
        "summary": "获取用户列表",
        "description": "分页获取系统中的用户列表",
        "parameters": [...],
        "responses": {...}
      }
    }
  }
}
```

## 📈 控制台输出

插件运行时会输出详细的处理日志：

```
[SwaggerLite] GET /api/users -> user.list
[SwaggerLite] POST /api/users -> user.create
[SwaggerLite] GET /api/users/:id -> user.show
[SwaggerLite] PUT /api/users/:id -> user.update
[SwaggerLite] DELETE /api/users/:id -> user.destroy
[SwaggerLite] Swagger UI 资源路径: /path/to/swagger-ui-dist
[SwaggerLite] 插件初始化完成
```

## 🔧 高级功能

### 多模块API分组

```javascript
/**
 * @Controller 订单管理 order-controller
 */
class OrderController extends BaseController {
  /**
   * @Summary 创建订单
   * @Router post /api/orders
   * @Request body orderForm 订单信息
   * @Response 200 JsonResult 创建成功
   */
  async create() {
    // ...
  }
}

/**
 * @Controller 商品管理 product-controller  
 */
class ProductController extends BaseController {
  /**
   * @Summary 商品列表
   * @Router get /api/products
   * @Response 200 JsonResult 获取成功
   */
  async list() {
    // ...
  }
}
```

### 复杂请求体定义

```javascript
// app/contract/order.js
module.exports = {
  orderForm: {
    customerId: { 
      type: 'integer', 
      required: true,
      description: '客户ID' 
    },
    items: {
      type: 'array',
      required: true,
      description: '订单商品列表',
      items: {
        type: 'object',
        properties: {
          productId: { type: 'integer', description: '商品ID' },
          quantity: { type: 'integer', description: '数量' },
          price: { type: 'number', description: '单价' }
        }
      }
    },
    totalAmount: { 
      type: 'number', 
      required: true,
      description: '订单总金额' 
    }
  }
};
```

## ⚠️ 注意事项

1. **注解格式** - 注解必须严格按照指定格式编写
2. **Contract命名** - Contract文件名必须与注解中的类型名匹配（小写）
3. **路径参数** - 动态路径参数会自动转换为 `:param` 格式
4. **文件扫描** - 只扫描 `app/controller/` 目录下的 `.js` 文件
5. **静态资源** - Swagger UI资源文件需要存在于插件目录中
6. **访问权限** - 生产环境建议限制文档访问权限

## 🚀 最佳实践

1. **完整注解** - 为每个API方法添加完整的注解信息
2. **语义化命名** - 使用有意义的Summary和Description
3. **统一响应** - 使用统一的响应格式和Contract定义
4. **参数描述** - 为所有参数提供清晰的描述和示例
5. **状态码规范** - 遵循HTTP状态码的标准用法
6. **分组合理** - 合理设计Controller分组，便于文档导航
7. **版本管理** - 考虑API版本化的文档组织方式

## 📱 Swagger UI 特性

生成的Swagger UI界面包含：

- 📚 **API浏览** - 按分组浏览所有API
- 🧪 **在线测试** - 直接在界面中测试API
- 📝 **参数填写** - 可视化的参数输入界面  
- 📊 **响应查看** - 查看API的响应结果
- 📋 **模型定义** - 展示请求/响应的数据模型
- 🔍 **搜索功能** - 快速查找特定的API
- 📥 **导出功能** - 导出OpenAPI JSON文档

## 🔍 故障排除

### 常见问题

1. **文档不显示**
   - 检查插件是否正确启用
   - 确认Controller文件中有正确的注解
   - 查看控制台是否有错误日志

2. **Contract不生效**
   - 确认Contract文件名与注解中的类型名匹配
   - 检查Contract文件的模块导出格式
   - 验证Contract文件路径是否正确

3. **路由重复注册**
   - 避免与手动路由重复
   - 检查是否同时使用了多个路由插件

---

## 🔗 相关链接

- [主项目文档](../../README.md)
- [egg-auto-router 插件](../egg-auto-router/README.md)
- [OpenAPI 3.0 规范](https://spec.openapis.org/oas/v3.0.3)
- [Swagger UI 文档](https://swagger.io/tools/swagger-ui/) 