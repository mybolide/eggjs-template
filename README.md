# 企业级中后台权限管理系统 (Vue + Egg.js)

![Vue.js](https://img.shields.io/badge/Vue.js-^2.6.11-brightgreen.svg)
![Element-UI](https://img.shields.io/badge/Element--UI-^2.13.2-blue.svg)
![Egg.js](https://img.shields.io/badge/Egg.js-^3.17.5-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange.svg)
![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)

一个功能完善的企业级中后台权限管理系统，基于 **Vue.js + Element UI**（前端）与 **Egg.js + MySQL**（后端）构建，实现前后端分离。内置 **用户、角色、权限、菜单管理**，支持 **基于角色的动态权限控制 (RBAC)**，并提供 **自动化代码生成**，开箱即用，适合二次开发。

🔗 **作者**：[ByteZoneX](https://www.bytezonex.com/)

---

## 📑 目录

* [项目结构](#-项目结构)
* [核心功能](#-核心功能)
* [技术栈](#-技术栈)
* [快速开始](#-快速开始)
* [系统预览](#️-系统预览)
* [常用命令](#-常用命令)
* [License](#-license)

---

## 📂 项目结构

```
├── admin-api/   # 后端 API 服务 (Egg.js)
├── admin-web/   # 前端管理界面 (Vue + Element UI)
└── sys.sql      # 数据库初始化脚本
```

---

## 🌟 核心功能

### 后端 (admin-api)

* **安全认证**：基于 `jsonwebtoken` 的 Token 认证机制
* **密码加密**：`bcryptjs` 哈希加密存储
* **权限管理**：完整 RBAC 模型，支持用户、角色、权限管理
* **自动化开发**

  * 一键生成 Model、Controller、Service、Contract (`npm run gen`)
  * 自动路由注册，无需手动配置
  * 集成 `egg-swagger-lite` 自动生成 API 文档
* **企业级架构**

  * MVC 分层，维护扩展性强
  * 基于 Contract 的参数校验
  * 统一响应格式 & 全局错误处理

### 前端 (admin-web)

* **技术框架**：`Vue.js` + `Element UI`
* **权限控制**

  * 动态路由：根据用户角色生成可访问菜单
  * 按钮级权限：精确到页面操作按钮
* **功能模块**

  * 登录 / 注销流程
  * 用户、角色、菜单、权限管理可视化界面
* **工程化**

  * 封装 Axios 请求/响应拦截器
  * 路由守卫进行权限校验

---

## 🛠 技术栈

| 模块  | 技术及版本                                                                           |
| --- | ------------------------------------------------------------------------------- |
| 前端  | Vue.js、Vuex、Vue Router、Element UI、Axios、ESLint                                  |
| 后端  | Node.js (>=18)、Egg.js、Sequelize、MySQL2、jsonwebtoken、bcryptjs、sequelize-automate |
| 数据库 | MySQL >= 5.7                                                                    |

---

## 🚀 快速开始

**环境要求**：

* Node.js >= 18.0.0
* MySQL >= 5.7

### 1️⃣ 启动后端服务

```bash
# 进入后端目录
cd admin-api

# 安装依赖
npm install

# 创建数据库
CREATE DATABASE your_db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 导入初始化数据
# 在 MySQL 中执行 sys.sql

# 修改数据库配置 config/config.default.js
# 启动服务
npm run dev
```

### 2️⃣ 启动前端项目

```bash
cd admin-web
npm install

# 修改 .env.development，确保 API 地址正确
VUE_APP_BASE_API = 'http://localhost:10882'

npm run serve
```

默认前端端口：`10002`

### 3️⃣ 访问系统

* 前端地址：[http://localhost:10002](http://localhost:10002)  
默认管理员账号：`admin / 123456`（或 sys.sql 中的初始值）
* 后端 API 文档：[http://localhost:10882/swagger-ui.html](http://localhost:10882/swagger-ui.html)

---

## 📜 License

MIT License © [ByteZoneX](https://www.bytezonex.com/)
