const BaseController = require("../framework/base/BaseController")

/**
 * @Controller {{data.serviceName}}服务控制器 {{tableName}}-controller
 */
class IndexController extends BaseController{

    /**
    * @summary 查询列表
    * @router get /fed-api/v1-0/{{tableName}}
    * @Request header string x-token
    * @response 200 JsonResult 操作成功
    */
    async list () {
        const { service } = this
        const data = await service.{{tableName}}Service.list('{{modelName}}')
        this.success(data)
    }

    /**
    * @summary 分页查询
    * @router get /fed-api/v1-0/{{tableName}}/page
    * @Request header string x-token
    * @request query integer pageNum eg:1 页码
    * @request query integer pageSize eg:10 每页个数
    * @response 200 JsonResult 操作成功
    */

    async page () {
        const { ctx, service } = this
        const query = ctx.query
        const data = await service.{{tableName}}Service.page('{{modelName}}', query.pageNum, query.pageSize)
        this.success(data)
    }

    /**
    * @summary 添加
    * @router post /fed-api/v1-0/{{tableName}}
    * @Request header string x-token
    * @request body {{tableName}}Form *body
    * @response 200 JsonResult 操作成功
    */
    async create () {
        const { ctx, service } = this
        ctx.validate(ctx.rule.{{tableName}}Form);
        const payload = ctx.request.body || {}
        const flag = await service.{{tableName}}Service.save('{{modelName}}', payload)
        if (flag) {
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @summary 修改
    * @router put /fed-api/v1-0/{{tableName}}/{id}
    * @Request header string x-token
    * @request path integer id eg:1 id
    * @request body {{tableName}}Form *body
    * @response 200 JsonResult 操作成功
    */
    async update () {
        const { ctx, service } = this
        const params = ctx.params
        const payload = ctx.request.body || {}
        const flag = await service.{{tableName}}Service.update('{{modelName}}', params.id, payload)
        if (flag) {
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @summary 删除
    * @router delete /fed-api/v1-0/{{tableName}}/{id}
    * @Request header string x-token
    * @request path integer id eg:1 id
    * @response 200 JsonResult 操作成功
    */
    async deleteById () {
        const { ctx, service } = this
        const params = ctx.params
        const flag = await service.{{tableName}}Service.removeById('{{modelName}}', params.id)
        if (flag) {
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @summary 查询详情
    * @router get /fed-api/v1-0/{{tableName}}/{id}
    * @Request header string x-token
    * @request path integer id eg:1 id
    * @response 200 JsonResult 操作成功
    */
    async getById () {
        const { ctx, service } = this
        const params = ctx.params
        const data = await service.{{tableName}}Service.getById('{{modelName}}', params.id)
        this.success(data)
    }
}


module.exports = IndexController;
