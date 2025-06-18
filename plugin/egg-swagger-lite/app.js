const fs = require('fs');
const path = require('path');
const parser = require('./lib/parser');
const swaggerUiAssetPath = path.resolve(__dirname, 'swagger-ui-dist');

module.exports = app => {
  app.beforeStart(() => {
    // 读取 controllers 路径
    const controllerDir = path.join(app.baseDir, 'app/controller');
    const routes = parser(controllerDir);

    // 加载contracts
    const contractDir = path.join(app.baseDir, 'app/contract');
    const contracts = {};
    fs.readdirSync(contractDir).forEach(file => {
      if (/\.js$/.test(file)) {
        const name = path.basename(file, '.js').toLowerCase();
        contracts[name] = require(path.join(contractDir, file));
      }
    });

    // 构造 Swagger doc
    const swaggerDoc = {
      openapi: '3.0.0',
      info: {
        title: 'Egg Swagger API',
        version: '1.0.0',
      },
      tags: [], // 存放tag列表
      paths: {},
    };

    // tags 字典，避免重复
    const tagMap = new Map();

    routes.forEach(route => {
      const ctrlName = path.basename(route.file, '.js');
      const ctrl = app.controller[ctrlName];
      const methodFn = ctrl && ctrl[route.methodName];

      if (!methodFn) {
        app.logger.warn(`[SwaggerLite] Missing controller: ${ctrlName}.${route.methodName}`);
        return;
      }

      // 注册路由
      app.router[route.router.method](route.router.path, methodFn);
      app.logger.info(`[SwaggerLite] ${route.router.method.toUpperCase()} ${route.router.path} -> ${ctrlName}.${route.methodName}`);

      // 处理 tags
      if (route.tag) {
        if (!tagMap.has(route.tag.name)) {
          tagMap.set(route.tag.name, route.tag.description);
          swaggerDoc.tags.push({
            name: route.tag.name,
            description: route.tag.description,
          });
        }
      }

      // 组装 parameters，排除 body 类型
      const parameters = (route.requests || [])
        .filter(r => r.location !== 'body')
        .map(r => ({
          name: r.name,
          in: r.location,
          description: r.description || '',
          required: r.location === 'path' || false,
          schema: { type: r.type.toLowerCase() }
        }));

      // 处理 requestBody
      let requestBody;
      const bodyRequest = (route.requests || []).find(r => r.location === 'body');
      if (bodyRequest) {
        const schemaProps = contracts[bodyRequest.type.toLowerCase()] || {};
        requestBody = {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: schemaProps[bodyRequest.type],
              },
            },
          },
        };
      }

      // 处理 responses
      const responses = (route.responses || []).reduce((acc, r) => {
        const schemaProps = contracts[r.type.toLowerCase()] || {};
        acc[r.status] = {
          description: r.description || 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: schemaProps[r.type],
              },
            },
          },
        };
        return acc;
      }, {
        200: { description: 'OK' }
      });

      // 写入 paths
      const pathItem = swaggerDoc.paths[route.router.path] ||= {};

      pathItem[route.router.method] = {
        tags: route.tag ? [route.tag.name] : [],
        summary: route.summary || '',
        description: route.description || '',
        parameters,
        requestBody,
        responses,
      };
    });

    app.swaggerDoc = swaggerDoc;

    // 提供 Swagger JSON API
    app.router.get('/swagger.json', ctx => {
      ctx.body = app.swaggerDoc;
    });

    // 重定向 /docs 到 /docs/index.html?url=/swagger.json
    app.router.get('/docs', ctx => {
      ctx.redirect('/docs/index.html?url=/swagger.json');
    });

    // 静态资源服务
    app.router.get('/docs/(.*)', async ctx => {
      const requestedPath = ctx.params[0] || 'index.html';
      const filePath = path.join(swaggerUiAssetPath, requestedPath);

      try {
        if (!fs.existsSync(filePath)) {
          ctx.status = 404;
          ctx.body = 'File not found';
          return;
        }

        const stat = fs.statSync(filePath);
        if (!stat.isFile()) {
          ctx.status = 404;
          ctx.body = 'Not a file';
          return;
        }

        // Content-Type 映射
        const ext = path.extname(requestedPath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.json': 'application/json',
        };
        ctx.type = mimeTypes[ext] || 'application/octet-stream';

        ctx.body = fs.readFileSync(filePath);
        ctx.set('Cache-Control', 'public, max-age=3600');
      } catch (err) {
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
        app.logger.error(`[SwaggerLite] 读取文件错误: ${err.message}`);
      }
    });

    app.logger.info(`[SwaggerLite] Swagger UI 资源路径: ${swaggerUiAssetPath}`);
    app.logger.info('[SwaggerLite] 插件初始化完成');
  });
};
