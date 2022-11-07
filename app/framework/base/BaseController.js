const { Controller } = require('egg');
const { clearDeep } = require('../../utils/common');

module.exports = class BaseController extends Controller {
  success (data = {}, msg) {
    const { ctx } = this;
    data = JSON.parse(JSON.stringify(data));
    clearDeep(data);
    ctx.body = {
      code: 1,
      msg: msg || '操作成功',
    };
    if (data) {
      ctx.body.data = data;
    }
    ctx.status = 200;
  }

  fail (msg = '') {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: msg || '系统繁忙',
    };
    ctx.body.data = {};
    ctx.status = 200;
  }

  data (code, msg = '', data) {
    const { ctx } = this;
    ctx.body = {
      code,
      data,
      msg: msg || '操作失败',
    };
    ctx.body.data = {};
    ctx.status = 200;
  }
};
