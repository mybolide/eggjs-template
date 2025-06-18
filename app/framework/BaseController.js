const { Controller } = require('egg');
const { clearDeep } = require('../utils/common')

module.exports = class BaseController extends Controller {
    success(data = {}, msg) {
        const { ctx } = this
        data = JSON.parse(JSON.stringify(data))
        clearDeep(data)
        ctx.body = {
            code: 1,
            msg: msg || '操作成功'
        }
        if (data) {
            ctx.body.data = data;
        }
        ctx.status = 200
    }

    fail(msg = '') {
        const { ctx } = this
        ctx.body = {
            code: 0,
            msg: msg || '操作失败'
        }
        ctx.body.data = {};
        ctx.status = 200
    }

    // 验证参数并统一处理错误
    async validateParams(rule, data) {
        const { ctx } = this;
        try {
            ctx.validate(rule, data);
            return null;  // 验证通过
        } catch (error) {
            // 统一处理验证错误
            if (error.errors && error.errors.length > 0) {
                const firstError = error.errors[0];
                const fieldName = firstError.field;
                const message = firstError.message;
                return `${fieldName}${message}`;
            }
            return '参数验证失败';
        }
    }
}
