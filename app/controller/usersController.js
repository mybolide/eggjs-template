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
        try {
            const data = await service.usersService.list('Users')
            this.success(data)
        } catch (error) {
            // 错误会被中间件自动捕获并处理
            throw error;
        }
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
        
        // 参数验证
        if (!query.pageNum || !query.pageSize) {
            this.throwBusinessError('页码和每页条数不能为空');
        }
        
        if (parseInt(query.pageNum) < 1 || parseInt(query.pageSize) < 1) {
            this.throwBusinessError('页码和每页条数必须大于0');
        }
        
        try {
            const data = await service.usersService.page('Users', query.pageNum, query.pageSize)
            this.success(data)
        } catch (error) {
            throw error;
        }
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
        const payload = ctx.request.body || {}
        
        // 使用新的参数验证方法
        await this.validateParams(ctx.app.rule.usersForm, payload)
        
        try {
            const flag = await service.usersService.save('Users', payload)
            if(flag){
                this.success({})
            } else {
                this.throwBusinessError('用户创建失败')
            }
        } catch (error) {
            throw error;
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
        
        // 验证ID是否存在
        if (!params.id) {
            this.throwBusinessError('用户ID不能为空');
        }
        
        // 验证用户是否存在
        const existingUser = await service.usersService.getById('Users', params.id)
        if (!existingUser) {
            this.throwNotFoundError('用户不存在');
        }
        
        try {
            const flag = await service.usersService.update('Users', params.id, payload)
            if(flag){
                this.success({})
            } else {
                this.throwBusinessError('用户更新失败')
            }
        } catch (error) {
            throw error;
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
        
        // 验证ID是否存在
        if (!params.id) {
            this.throwBusinessError('用户ID不能为空');
        }
        
        // 验证用户是否存在
        const existingUser = await service.usersService.getById('Users', params.id)
        if (!existingUser) {
            this.throwNotFoundError('用户不存在');
        }
        
        try {
            const flag = await service.usersService.removeById('Users', params.id)
            if(flag){
                this.success({})
            } else {
                this.throwBusinessError('用户删除失败')
            }
        } catch (error) {
            throw error;
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
        
        // 验证ID是否存在
        if (!params.id) {
            this.throwBusinessError('用户ID不能为空');
        }
        
        try {
            const data = await service.usersService.getById('Users', params.id)
            if (!data) {
                this.throwNotFoundError('用户不存在');
            }
            this.success(data)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = IndexController;