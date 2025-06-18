const fs = require('fs');
const path = require('path');

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const routes = [];
  let current = {};
  let currentTag = null;

  lines.forEach(line => {
    line = line.trim();
    if (/^\/\//.test(line) || line === '') return;

    // 解析 @Controller 注解
    if (/^\*\s*@Controller/i.test(line)) {
      // 例：@Controller 文件上传服务控制器 uploadFile-controller
      const match = line.match(/@Controller\s+(.+?)\s+(\S+)$/i);
      if (match) {
        currentTag = {
          name: match[1].trim(),
          description: match[2].trim(),
        };
      }
    }

    // 解析 @Router
    if (/^\*\s*@Router/i.test(line)) {
      const match = line.match(/@Router\s+(\w+)\s+(.*)/i);
      if (match) {
        current.router = {
          method: match[1].toLowerCase(),
          path: match[2].trim(),
        };
      }
    }

    // 解析 @Summary
    if (/^\*\s*@Summary/i.test(line)) {
      current.summary = line.replace(/^\*\s*@Summary\s+/, '');
    }

    // 解析 @Description
    if (/^\*\s*@Description/i.test(line)) {
      current.description = line.replace(/^\*\s*@Description\s+/, '');
    }

    // 解析 @Request
    if (/^\*\s*@Request/i.test(line)) {
      const match = line.match(/@Request\s+(\w+)\s+(\w+)(?:\s+(\w+))?(?:\s+(.*))?/i);
      if (match) {
        const [ , location, type, name, desc ] = match;
        if (!current.requests) current.requests = [];
        current.requests.push({
          location,
          type,
          name: name || '',
          description: desc || ''
        });
      }
    }

    // 解析 @Response
    if (/^\*\s*@Response/i.test(line)) {
      const match = line.match(/@Response\s+(\d+)\s+(\w+)(?:\s+(.*))?/i);
      if (match) {
        if (!current.responses) current.responses = [];
        current.responses.push({
          status: match[1],
          type: match[2],
          description: match[3] || '',
        });
      }
    }

    // 匹配 async index() 或 index()
    const fnMatch = line.match(/^(async\s+)?(\w+)\s*\(/);
    if (fnMatch) {
      const fnName = fnMatch[2];
      if (current.router) {
        current.methodName = fnName;
        if (currentTag) {
          current.tag = currentTag;
        }
        routes.push(current);
        current = {};
      }
    }
  });

  return routes;
}

module.exports = function parseAll(dir) {
  const files = fs.readdirSync(dir);
  let allRoutes = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (/\.js$/.test(file)) {
      const routes = parseFile(fullPath).map(r => ({
        ...r,
        file,
      }));
      allRoutes = allRoutes.concat(routes);
    }
  }

  return allRoutes;
};
