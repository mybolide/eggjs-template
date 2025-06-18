const BaseController = require("../framework/BaseController")

/**
 * @Controller 用户服务控制器 users-controller
 */
class IndexController extends BaseController{

    /**
    * @Summary 查询列表
    * @Router get /fed-api/v1-0/users
    * @Request header string authentication 身份验证token
    * @Response 200 JsonResult 操作成功
    */
    async list() {
        const { service } = this
        const data = await service.usersService.list('Users')
        this.success(data)
    }

    /**
    * @Summary 分页查询
    * @Router get /fed-api/v1-0/users/page
    * @Request header string authentication 身份验证token
    * @Request query integer pageNum eg:1 页码
    * @Request query integer pageSize eg:10 每页个数
    * @Response 200 JsonResult 操作成功
    */

    async page() {
        const { ctx, service } = this
        const query = ctx.query
        const data = await service.usersService.page('Users', query.pageNum, query.pageSize)
        this.success(data)
    }

    /**
    * @Summary 添加
    * @Router post /fed-api/v1-0/users
    * @Request header string authentication 身份验证token
    * @Request body usersForm *body
    * @Response 200 JsonResult 操作成功
    */
    async create() {
        const { ctx, service } = this
        ctx.validate(ctx.app.rule.usersForm);
        const payload = ctx.request.body || {}
        const flag = await service.usersService.save('Users', payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 修改
    * @Router put /fed-api/v1-0/users/{id}
    * @Request header string authentication 身份验证token
    * @Request path integer id eg:1 id
    * @Request body usersForm *body
    * @Response 200 JsonResult 操作成功
    */
    async update() {
        const { ctx, service } = this
        const params = ctx.params
        const payload = ctx.request.body || {}
        const flag = await service.usersService.update('Users', params.id, payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 删除
    * @Router delete /fed-api/v1-0/users/{id}
    * @Request header string authentication 身份验证token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async deleteById() {
        const { ctx, service } = this
        const params = ctx.params
        const flag = await service.usersService.removeById('Users', params.id)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 查询详情
    * @Router get /fed-api/v1-0/users/{id}
    * @Request header string authentication 身份验证token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async getById() {
        const { ctx, service } = this
        const params = ctx.params
        const data = await service.usersService.getById('Users', params.id)
        this.success(data)
    }
}


module.exports = IndexController;