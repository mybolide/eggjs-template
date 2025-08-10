# Egg.js Template - 企业级自动化代码生成模板

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-green.svg)
![Egg.js](https://img.shields.io/badge/Egg.js-3.17.5-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-支持-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

一个基于 Egg.js 的企业级 RESTful API 模板<br/>
集成自动代码生成、API 文档和智能路由功能

---

**🔗 项目作者：[ByteZoneX](https://www.bytezonex.com)**

[特性](#特性) • [快速开始](#快速开始) • [自动生成](#自动代码生成) • [API 文档](#api-文档) • [项目结构](#项目结构)

</div>

## 🌟 特性

### 🚀 自动化开发
- **智能代码生成**：基于数据库表结构自动生成 Model、Controller、Service、Contract
- **自动路由注册**：通过注释自动生成 RESTful API 路由
- **API 文档自动生成**：集成 Swagger 文档，开发即文档

### 🏗️ 企业级架构
- **MVC 模式**：清晰的分层架构，易于维护和扩展
- **参数验证**：基于 Contract 的请求参数自动验证
- **统一响应格式**：标准化的 API 响应结构
- **国际化支持**：内置 i18n 多语言支持

### 💡 开发体验
- **TypeScript 支持**：完整的类型声明文件
- **热重载开发**：开发环境自动重启
- **代码质量检查**：ESLint 代码规范检查
- **测试覆盖率**：完整的单元测试框架

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Node.js** | >=18.0.0 | JavaScript 运行环境 |
| **Egg.js** | ^3.17.5 | 企业级 Node.js 框架 |
| **Sequelize** | ^6.0.0 | ORM 数据库映射 |
| **MySQL** | ^3.14.1 | 关系型数据库 |
| **sequelize-automate** | ^1.2.2 | 自动代码生成工具 |

## 📦 核心依赖

```json
{
  "egg": "^3.17.5",                // Egg.js 核心框架
  "egg-sequelize": "^6.0.0",      // Sequelize ORM 插件  
  "egg-validate": "^2.0.2",       // 参数验证插件
  "egg-i18n": "^2.1.1",          // 国际化插件
  "mysql2": "^3.14.1",           // MySQL 驱动
  "sequelize-automate": "^1.2.2"  // 代码自动生成
}
```

## 🚀 快速开始

### 📋 环境要求

确保您的开发环境满足以下要求：

- **Node.js** >= 18.0.0
- **MySQL** >= 5.7 或 >= 8.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0

### 📥 安装步骤

1. **克隆项目**
   ```bash
   git clone [您的仓库地址]
   cd eggjs-template
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 yarn
   yarn install
   ```

3. **配置数据库**
   
   创建 MySQL 数据库：
   ```sql
   CREATE DATABASE test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **修改配置文件**
   
   编辑 `config/config.default.js`：
   ```javascript
   config.sequelize = {
     dialect: 'mysql',
     host: 'localhost',        // 数据库地址
     port: 3306,              // 数据库端口
     database: 'test',        // 数据库名称
     username: 'root',        // 用户名
     password: '123456',      // 密码
   };
   ```

5. **启动应用**
   ```bash
   # 开发模式
   npm run dev
   
   # 生产模式
   npm start
   ```

6. **验证安装**
   
   打开浏览器访问：
   - API 健康检查：http://localhost:7001/health
   - Swagger 文档：http://localhost:7001/swagger-ui.html

### ⚙️ 配置说明

| 配置项 | 文件位置 | 说明 |
|--------|----------|------|
| 数据库配置 | `config/config.default.js` | MySQL 连接信息 |
| 代码生成配置 | `automate.config.json` | 自动生成参数 |
| 插件配置 | `config/plugin.js` | Egg.js 插件启用 | 