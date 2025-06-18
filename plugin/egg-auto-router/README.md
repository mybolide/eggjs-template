# egg-auto-router

🚀 **智能路由自动注册插件** - 通过注解自动生成路由，告别手动路由配置的繁琐工作

## 📋 功能特性

- 🎯 **注解驱动** - 通过 `@Router` 注解自动注册路由
- 🔄 **动态路由支持** - 自动转换路径参数格式 `{id}` → `:id`
- 📝 **验证规则集成** - 自动关联 Contract 验证规则
- ⚡ **零配置启用** - 插件启用后自动扫描所有Controller
- 🔍 **智能解析** - 自动识别方法名和路由映射关系

## 🛠️ 安装配置

### 1. 启用插件

在 `config/plugin.js` 中启用插件：

```javascript
// config/plugin.js
const path = require('path');

module.exports = {
  autoRouter: {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-auto-router'),
  }
};
```

### 2. 无需额外配置

插件启用后会自动扫描 `app/controller/` 目录下的所有文件，无需额外配置。

## 📖 使用方法

### 基础路由注解

在Controller方法上添加 `@Router` 注解：

```javascript
// app/controller/user.js
const BaseController = require('../framework/BaseController');

class UserController extends BaseController {
  /**
   * @Router get /api/users
   */
  async list() {
    // 自动注册: GET /api/users -> user.list
    this.success(await this.service.user.list());
  }

  /**
   * @Router post /api/users
   * @Request body userForm
   */
  async create() {
    // 自动注册: POST /api/users -> user.create
    // 自动关联验证规则: userForm
    const payload = this.ctx.request.body;
    this.success(await this.service.user.create(payload));
  }

  /**
   * @Router get /api/users/{id}
   */
  async show() {
    // 自动注册: GET /api/users/:id -> user.show
    // 动态参数自动转换: {id} → :id
    const { id } = this.ctx.params;
    this.success(await this.service.user.findById(id));
  }

  /**
   * @Router put /api/users/{id}
   * @Request body userForm
   */
  async update() {
    // 自动注册: PUT /api/users/:id -> user.update
    const { id } = this.ctx.params;
    const payload = this.ctx.request.body;
    this.success(await this.service.user.update(id, payload));
  }

  /**
   * @Router delete /api/users/{id}
   */
  async destroy() {
    // 自动注册: DELETE /api/users/:id -> user.destroy
    const { id } = this.ctx.params;
    this.success(await this.service.user.delete(id));
  }
}

module.exports = UserController;
```

### 验证规则集成

当使用 `@Request body` 注解时，插件会自动关联对应的Contract验证规则：

```javascript
// app/contract/user.js
module.exports = {
  userForm: {
    name: { type: 'string', required: true },
    email: { type: 'email', required: true },
    age: { type: 'int', min: 1, max: 120 }
  }
};
```

```javascript
// app/controller/user.js
class UserController extends BaseController {
  /**
   * @Router post /api/users
   * @Request body userForm  // 自动关联 contract/user.js 中的 userForm 规则
   */
  async create() {
    // 验证规则自动可用: this.ctx.app.rule.userForm
    const payload = this.ctx.request.body;
    this.success(await this.service.user.create(payload));
  }
}
```

## 🎯 注解语法

### @Router 语法

```javascript
/**
 * @Router {method} {path}
 */
```

**参数说明：**
- `method`: HTTP方法 (get/post/put/delete/patch等)
- `path`: 路由路径，支持动态参数

**路径参数转换：**
- `{id}` → `:id`
- `{userId}` → `:userId`
- `/api/users/{id}/posts/{postId}` → `/api/users/:id/posts/:postId`

### @Request 语法

```javascript
/**
 * @Request {location} {name}
 */
```

**参数说明：**
- `location`: 参数位置
  - `body` - 请求体（自动关联Contract规则）
  - `query` - URL查询参数
  - `path` - 路径参数
  - `header` - 请求头
- `name`: 参数名称或Contract规则名

## 📊 工作原理

1. **扫描阶段** - 应用启动时扫描所有Controller文件
2. **解析阶段** - 解析文件中的 `@Router` 和 `@Request` 注解
3. **转换阶段** - 将动态路径参数转换为Egg.js格式
4. **注册阶段** - 自动调用 `app.router[method](path, handler)` 注册路由
5. **关联阶段** - 关联Contract验证规则到 `app.rule`

## 📈 控制台输出

插件运行时会输出详细的路由注册日志：

```
[AutoRouter] GET /api/users -> user.list
[AutoRouter] POST /api/users -> user.create
[AutoRouter] GET /api/users/:id -> user.show
[AutoRouter] PUT /api/users/:id -> user.update
[AutoRouter] DELETE /api/users/:id -> user.destroy
```

## ⚠️ 注意事项

1. **方法名推断** - 插件会自动识别注解后的第一个方法名
2. **文件扫描** - 只扫描 `app/controller/` 目录下的 `.js` 文件
3. **Contract关联** - `@Request body` 注解的参数名必须与Contract文件名匹配
4. **路由冲突** - 避免自动路由与手动路由路径冲突
5. **注解格式** - 注解必须严格按照指定格式编写

## 🔧 高级用法

### 复杂路由示例

```javascript
class ApiController extends BaseController {
  /**
   * @Router get /api/v1/users/{userId}/posts/{postId}/comments
   */
  async getComments() {
    // 注册为: GET /api/v1/users/:userId/posts/:postId/comments
    const { userId, postId } = this.ctx.params;
    // ...
  }

  /**
   * @Router post /api/upload
   * @Request body uploadForm
   */
  async upload() {
    // 支持文件上传路由
    // ...
  }
}
```

### 与手动路由混用

```javascript
// app/router.js
module.exports = app => {
  // 手动路由（特殊场景）
  app.router.get('/health', ctx => {
    ctx.body = 'ok';
  });
  
  // 其他路由交给 auto-router 插件自动处理
};
```

## 🚀 最佳实践

1. **统一注解风格** - 保持注解格式的一致性
2. **合理路径设计** - 遵循RESTful API设计规范
3. **验证规则复用** - 充分利用Contract验证规则的复用性
4. **方法命名规范** - 使用语义化的方法名便于维护
5. **文档化注释** - 结合Swagger插件提供完整的API文档

---

## 🔗 相关链接

- [主项目文档](../../README.md)
- [egg-swagger-lite 插件](../egg-swagger-lite/README.md)
- [Egg.js 路由文档](https://eggjs.github.io/zh/basics/router.html) 