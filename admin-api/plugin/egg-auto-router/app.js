const fs = require('fs');
const path = require('path');
const parseRouterComments = require('./lib/autoRouter');

module.exports = app => {
  app.beforeStart(() => {
    const controllerDir = path.join(app.baseDir, 'app/controller');
    const files = fs.readdirSync(controllerDir);

    // 加载contracts
    const contractDir = path.join(app.baseDir, 'app/contract');
    const contracts = {};
    fs.readdirSync(contractDir).forEach(file => {
      if (/\.js$/.test(file)) {
        const name = path.basename(file, '.js');
        contracts[name] = require(path.join(contractDir, file));
      }
    });

    files.forEach(file => {
      const filePath = path.join(controllerDir, file);
      const routes = parseRouterComments(filePath);
      const ctrlName = path.basename(file, '.js');
      routes.forEach(r => {
        if (r.rulesKey) {
          const rule = app.rule || {}
          rule[r.rulesKey] = contracts[r.rulesKey][r.rulesKey]
          app.rule = rule
        }
        if (!app.controller[ctrlName] || !app.controller[ctrlName][r.methodName]) {
          app.logger.warn(`[AutoRouter] Controller ${ctrlName}.${r.methodName} not found`);
          return;
        }
        app.router[r.router.method](r.router.path, app.controller[ctrlName][r.methodName]);
        app.logger.info(`[AutoRouter] ${r.router.method.toUpperCase()} ${r.router.path} -> ${ctrlName}.${r.methodName}`);
      });
    });
  });
};
