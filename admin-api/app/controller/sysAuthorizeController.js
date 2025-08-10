const BaseController = require("../framework/BaseController")
const common = require('../utils/common')


/**
 * @Controller 用户相关 sys-authorize-controller
 */
class IndexController extends BaseController {
  /**
   * @Summary 根据token获取用户权限
   * @Router get /fed-api/v1-0/sysAuthorize/permission/{token}
   * @Request header string fed-token
   * @Request path string token token
   * @Response 200 JsonResult 操作成功
   */
  async get() {
    const { ctx, service } = this
    const params = ctx.params
    const tokens = await service.sysTokenService.getByToken(params.token)
    // 获取到用户id
    const accountId = tokens.accountId
    console.info(accountId)
    // 根据用户id 获取角色
    const accountRoles = await service.sysAccountRoleService.getByAccountId(accountId)
    // 根据角色获取权限
    let rolePermissionArr = []

    for (let i = 0; i < accountRoles.length; i++) {
      const roleId = accountRoles[i].roleId
      const rolePermission = await service.sysRolePermissionService.getByRoleId(roleId)
      rolePermissionArr = rolePermissionArr.concat(rolePermission.map(item => item.permissionId))
    }
    // 根据权限id获取权限列表
    const permissions = await service.tPermissionService.getByIds(rolePermissionArr)

    const resPermissions = []
    permissions.map(item => {
      const permission = item.permission
      if (permission) {
        resPermissions.push(item.permission)
      }
    })
    return this.success(resPermissions)
  }

  /**
   * @Summary 根据token获取用户菜单
   * @Router get /fed-api/v1-0/sysAuthorize/menu/{token}
   * @Request header string fed-token
   * @Request path string token token
   * @Request query string appId appId
   * @Response 200 JsonResult 操作成功
   */
  async getMenu() {
    const { ctx, service } = this
    const params = ctx.params
    const tokens = await service.sysTokenService.getByToken(params.token)
    // 获取到用户id
    const accountId = tokens.accountId
    console.info(accountId)
    // 根据用户id 获取角色
    const accountRoles = await service.sysAccountRoleService.getByAccountId(accountId)
    // 根据角色获取权限
    let rolePermissionArr = []

    for (let i = 0; i < accountRoles.length; i++) {
      const roleId = accountRoles[i].roleId
      const rolePermission = await service.sysRolePermissionService.getByRoleId(roleId)
      rolePermissionArr = rolePermissionArr.concat(rolePermission.map(item => item.permissionId))
    }
    const appId = ctx.query.appId
    // 根据权限id获取权限列表
    const permissions = await service.sysPermissionService.getByIds(rolePermissionArr, 'MENU', appId)
    return this.success(common.dataToTree(permissions))
  }
  /**
   * @Summary 根据token获取用户系统
   * @Router get /fed-api/v1-0/sysAuthorize/app/{token}
   * @Request header string fed-token
   * @Request path string token token
   * @Response 200 JsonResult 操作成功
   */
  async getApp() {
    const { ctx, service } = this
    const params = ctx.params
    const tokens = await service.sysTokenService.getByToken(params.token)
    // 获取到用户id
    const accountId = tokens.accountId
    const data = await service.sysAppService.getAppByAccountId(accountId)
    return this.success(data)
  }
}

module.exports = IndexController
