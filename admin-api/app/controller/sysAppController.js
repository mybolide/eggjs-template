const BaseController = require("../framework/BaseController")

/**
 * @Controller 系统应用服务控制器 sysApp-controller
 */
class IndexController extends BaseController{

    /**
    * @Summary 查询列表
    * @Router get /fed-api/v1-0/sysApp
    * @Request header string fed-token
    * @Response 200 JsonResult 操作成功
    */
    async list() {
        const { service } = this
        const data = await service.sysAppService.list('SysApp')
        this.success(data)
    }

    /**
    * @Summary 分页查询
    * @Router get /fed-api/v1-0/sysApp/page
    * @Request header string fed-token
    * @Request query integer pageNum eg:1 页码
    * @Request query integer pageSize eg:10 每页个数
    * @Response 200 JsonResult 操作成功
    */

    async page() {
        const { ctx, service } = this
        const query = ctx.query

        const data = await service.sysAppService.page('SysApp', query.pageNum, query.pageSize)
        this.success(data)
    }

    /**
    * @Summary 添加
    * @Router post /fed-api/v1-0/sysApp
    * @Request header string fed-token
    * @Request body sysAppForm *body
    * @Response 200 JsonResult 操作成功
    */
    async create() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        const error = await this.validateParams(ctx.app.rule.sysAppForm, payload)
        if(error){
            this.fail(error)
            return
        }
        const flag = await service.sysAppService.save('SysApp', payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 修改
    * @Router put /fed-api/v1-0/sysApp/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Request body sysAppForm *body
    * @Response 200 JsonResult 操作成功
    */
    async update() {
        const { ctx, service } = this
        const params = ctx.params
        const payload = ctx.request.body || {}
        const flag = await service.sysAppService.update('SysApp', params.id, payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 删除
    * @Router delete /fed-api/v1-0/sysApp/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async deleteById() {
        const { ctx, service } = this
        const params = ctx.params
        const flag = await service.sysAppService.removeById('SysApp', params.id)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 查询详情
    * @Router get /fed-api/v1-0/sysApp/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async getById() {
        const { ctx, service } = this
        const params = ctx.params
        const data = await service.sysAppService.getById('SysApp', params.id)
        this.success(data)
    }
}


module.exports = IndexController;