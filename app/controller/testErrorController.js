const BaseController = require("../framework/BaseController");

/**
 * @Controller 错误处理测试控制器 test-error-controller
 */
class TestErrorController extends BaseController {

    /**
     * @Summary 测试业务错误
     * @Router get /test/business-error
     * @Response 200 JsonResult 操作结果
     */
    async testBusinessError() {
        // 模拟业务错误
        this.throwBusinessError('这是一个业务错误示例');
    }

    /**
     * @Summary 测试参数验证错误
     * @Router post /test/validation-error
     * @Request body demoForm 请求体
     * @Response 200 JsonResult 操作结果
     */
    async testValidationError() {
        const { ctx } = this;
        const payload = ctx.request.body || {};
        
        // 使用参数验证，如果验证失败会抛出ValidationError
        await this.validateParams(ctx.app.rule.demoForm, payload);
        
        this.success({ message: '参数验证通过' });
    }

    /**
     * @Summary 测试权限错误
     * @Router get /test/auth-error
     * @Response 200 JsonResult 操作结果
     */
    async testAuthError() {
        // 模拟权限错误
        this.throwAuthError('您没有权限访问此资源');
    }

    /**
     * @Summary 测试资源不存在错误
     * @Router get /test/not-found-error
     * @Response 200 JsonResult 操作结果
     */
    async testNotFoundError() {
        // 模拟资源不存在错误
        this.throwNotFoundError('请求的资源不存在');
    }

    /**
     * @Summary 测试系统错误
     * @Router get /test/system-error
     * @Response 200 JsonResult 操作结果
     */
    async testSystemError() {
        // 模拟系统错误
        throw new Error('这是一个系统错误示例');
    }

    /**
     * @Summary 测试异步错误
     * @Router get /test/async-error
     * @Response 200 JsonResult 操作结果
     */
    async testAsyncError() {
        // 模拟异步操作中的错误
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('异步操作失败'));
            }, 100);
        });
    }

    /**
     * @Summary 测试成功响应
     * @Router get /test/success
     * @Response 200 JsonResult 操作结果
     */
    async testSuccess() {
        this.success({ message: '操作成功' }, '测试成功');
    }
}

module.exports = TestErrorController; 