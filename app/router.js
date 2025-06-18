/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 特殊场景：手动写的路由
  router.get('/health', ctx => {
    ctx.body = 'ok';
  });
  // 其他 API 路由都交给插件自动生成
};
