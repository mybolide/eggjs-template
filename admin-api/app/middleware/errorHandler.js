/**
 * 错误处理中间件
 * 统一处理所有错误，输出格式为 {code: 0, msg: '错误信息'}
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.body = { code: 404, data: {},msg: '请求不存在' };
      }
    } catch (err) {
      // 记录错误日志
      ctx.logger.error('Error occurred:', err);
      
      // 设置响应状态码
      ctx.status = err.status || 500;
      
      // 统一错误响应格式
      ctx.body = {
        code: 0,
        msg: err.message || '服务器内部错误',
        data: {}
      };
      
      // 如果是开发环境，可以返回更详细的错误信息
      if (ctx.app.config.env === 'local') {
        ctx.body.stack = err.stack;
      }
    }
  };
}; 