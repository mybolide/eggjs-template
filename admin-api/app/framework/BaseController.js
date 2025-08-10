const { Controller } = require('egg');
const { clearDeep } = require('../utils/common');
const { BusinessError, ValidationError, AuthError, NotFoundError } = require('../utils/errorHandler');

module.exports = class BaseController extends Controller {
    success(data = {}, msg) {
        const { ctx } = this
        data = JSON.parse(JSON.stringify(data))
        clearDeep(data)
        ctx.body = {
            code: 1,
            msg: msg || 'success'
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
            msg: msg || 'error'
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
            console.info(rule)
            console.info(error)
            // 统一处理验证错误
            if (error.errors && error.errors.length > 0) {
                const firstError = error.errors[0];
                const fieldName = firstError.field;
                const message = firstError.message;
                throw new ValidationError(`${message}`);
            }
            throw new ValidationError('参数验证失败');
        }
    }

    // 抛出业务错误
    throwBusinessError(message) {
        throw new BusinessError(message);
    }

    // 抛出权限错误
    throwAuthError(message = '权限不足') {
        throw new AuthError(message);
    }

    // 抛出资源不存在错误
    throwNotFoundError(message = '资源不存在') {
        throw new NotFoundError(message);
    }

    // 安全的数据获取方法
    safeGet(obj, path, defaultValue = null) {
        try {
            return path.split('.').reduce((current, key) => {
                return current && current[key] !== undefined ? current[key] : defaultValue;
            }, obj);
        } catch (error) {
            return defaultValue;
        }
    }
}
