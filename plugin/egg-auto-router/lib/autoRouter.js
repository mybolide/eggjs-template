'use strict';

const fs = require('fs');

module.exports = function parseRouterComments(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const routes = [];
  let current = {};

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();

    if (line.startsWith('* @Router')) {
      const match = line.match(/\*\s*@Router\s+(\w+)\s+(.+)/);
      if (match) {
        const method = match[1].toLowerCase();
        let path = match[2].trim();
        // 转换动态路由
        path = path.replace(/{(\w+)}/g, ':$1');

        current.router = { method, path };
      }
    } else if (line.startsWith('* @Request')) {
      const match = line.match(/\*\s*@Request\s+(\w+)\s+(\w+)/);
      if (match) {
        const [ , location, name ] = match;
        if (location === 'body') {
          current.rulesKey = name;
        }
      }
    } else if (line === '*/') {
      // 注解结束，找最近的函数名
      if (current.router) {
        current.methodName = inferMethodName(lines, idx + 1) || 'index';
        routes.push(current);
        current = {};
      }
    }
  }

  return routes;
};

function inferMethodName(lines, startIdx) {
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    // 匹配 class 方法声明: async xxx() 或 xxx()
    const match = line.match(/^(async\s+)?(\w+)\s*\(/);
    if (match) {
      return match[2]; // 返回方法名
    }
    // 碰到下一个注释块或类结束，就不再继续
    if (line.startsWith('/**') || line.startsWith('}')) {
      break;
    }
  }
  return null;
}
