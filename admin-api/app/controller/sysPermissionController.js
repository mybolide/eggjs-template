const BaseController = require("../framework/BaseController")

/**
 * @Controller 权限服务控制器 sysPermission-controller
 */
class IndexController extends BaseController{

    /**
    * @Summary 查询列表
    * @Router get /fed-api/v1-0/sysPermission
    * @Request header string fed-token
    * @Response 200 JsonResult 操作成功
    */
    async list() {
        const { service } = this
        const data = await service.sysPermissionService.list('SysPermission')
        // const treeList = this.generateTree(JSON.parse(JSON.stringify(data)))
        this.success(data)
    }

    /**
    * @Summary 添加
    * @Router post /fed-api/v1-0/sysPermission
    * @Request header string fed-token
    * @Request body sysPermissionForm *body
    * @Response 200 JsonResult 操作成功
    */
    async create() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        const error = await this.validateParams(ctx.app.rule.sysPermissionForm, payload)
        if(error){
            this.fail(error)
            return
        }
        const flag = await service.sysPermissionService.save('SysPermission', payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 修改
    * @Router put /fed-api/v1-0/sysPermission/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Request body sysPermissionForm *body
    * @Response 200 JsonResult 操作成功
    */
    async update() {
        const { ctx, service } = this
        const params = ctx.params
        const payload = ctx.request.body || {}
        const flag = await service.sysPermissionService.update('SysPermission', params.id, payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 删除
    * @Router delete /fed-api/v1-0/sysPermission/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async deleteById() {
        const { ctx, service } = this
        const params = ctx.params
        const flag = await service.sysPermissionService.removeById('SysPermission', params.id)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 查询详情
    * @Router get /fed-api/v1-0/sysPermission/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async getById() {
        const { ctx, service } = this
        const params = ctx.params
        const data = await service.sysPermissionService.getById('SysPermission', params.id)
        this.success(data)
    }
}


module.exports = IndexController;