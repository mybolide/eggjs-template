const BaseController = require("../framework/BaseController")

/**
 * @Controller 角色服务控制器 sysRole-controller
 */
class IndexController extends BaseController{

    /**
    * @Summary 查询列表
    * @Router get /fed-api/v1-0/sysRole
    * @Request header string fed-token
    * @Request integer userId userId
    * @Response 200 JsonResult 操作成功
    */
    async list() {
        const { ctx, service } = this
        const query = ctx.query
        const data = await service.sysRoleService.list('SysRole')
        // // 剔除code是 SYS_ADMIN 的对象
        const res  = {
            roles: data
        }
        if (query.accountId) {
            const userRole = await service.sysAccountRoleService.list('SysAccountRole', { accountId: query.accountId})
            res['userRole'] = userRole
        }
        
        
        this.success(res)
    }

    /**
    * @Summary 分页查询
    * @Router get /fed-api/v1-0/sysRole/page
    * @Request header string fed-token
    * @Request query integer pageNum eg:1 页码
    * @Request query integer pageSize eg:10 每页个数
    * @Response 200 JsonResult 操作成功
    */

    async page() {
        const { ctx, service } = this
        const query = ctx.query
        const data = await service.sysRoleService.page('SysRole', query.pageNum, query.pageSize)
        this.success(data)
    }

    /**
    * @Summary 添加
    * @Router post /fed-api/v1-0/sysRole
    * @Request header string fed-token
    * @Request body sysRoleForm *body
    * @Response 200 JsonResult 操作成功
    */
    async create() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        const error = await this.validateParams(ctx.app.rule.sysRoleForm, payload)
        if(error){
            this.fail(error)
            return
        }
        let flag = {}
        const roleData = {
            code:  payload.code,
            description: payload.description,
            name: payload.name,
            type: payload.type
        }
        if (payload.id) {
            await service.sysRoleService.update('SysRole', payload.id, payload)
            console.info()
            flag.id = payload.id
        } else {
            flag = await service.sysRoleService.save('SysRole', roleData)
        }
        //更新角色权限表
        const sysRolePermissions = await service.sysRolePermissionService.list('SysRolePermission', { roleId: flag.id })
        if (sysRolePermissions && sysRolePermissions.length > 0) {
            // 使用 Promise.all 等待所有删除操作完成
            await Promise.all(
                sysRolePermissions.map(item => 
                    service.sysRolePermissionService.removeById('SysRolePermission', item.id)
                )
            )
        }
        
        const powerIds = payload.powerIds
        if (powerIds && powerIds.length > 0) {
            // 使用 Promise.all 等待所有权限添加操作完成
            await Promise.all(
                powerIds.map(item => 
                    service.sysRolePermissionService.save('SysRolePermission', {
                        roleId: flag.id,
                        permissionId: item
                    })
                )
            )
        }
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 修改
    * @Router put /fed-api/v1-0/sysRole/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Request body sysRoleForm *body
    * @Response 200 JsonResult 操作成功
    */
    async update() {
        const { ctx, service } = this
        const params = ctx.params
        const payload = ctx.request.body || {}
        const flag = await service.sysRoleService.update('SysRole', params.id, payload)
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 删除
    * @Router delete /fed-api/v1-0/sysRole/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async deleteById() {
        const { ctx, service } = this
        const params = ctx.params
        const flag = await service.sysRoleService.removeById('SysRole', params.id)
        //更新角色权限表
        const sysRolePermissions = await service.sysRolePermissionService.list('SysRolePermission', { roleId: params.id })
        sysRolePermissions.map(async item => {
            await service.sysRolePermissionService.removeById('SysRolePermission', item.id)
        })
        if(flag){
            this.success({})
        } else {
            this.fail()
        }
    }

    /**
    * @Summary 查询详情
    * @Router get /fed-api/v1-0/sysRole/{id}
    * @Request header string fed-token
    * @Request path integer id eg:1 id
    * @Response 200 JsonResult 操作成功
    */
    async getById() {
        const { ctx, service } = this
        const params = ctx.params
        const data = await service.sysRoleService.getById('SysRole', params.id)
        this.success(data)
    }
}


module.exports = IndexController;