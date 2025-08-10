const BaseController = require('../framework/BaseController')
const uuid = require('../utils/uuid')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
const bcrypt = require('bcryptjs');
/**
 * @Controller 认证服务 sys-auth-controller
 */
class IndexController extends BaseController {


  /**
   * @Summary APP登录
   * @Router post /fed-api/open/app-login
   * @Request header string platform app
   * @Request body loginForm *body
   * @Response 200 JsonResult 操作成功
   */
  async appLogin() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const userName = payload.userName
    if(!userName) {
      this.fail('帐号不能为空')
      return
    }
    const password = payload.password
    if(!password) {
      this.fail('密码不能为空')
      return
    }

    const userInfo = await this.getProfile({userName, password})
    
    if (userInfo) {
      const _cacheUser = { ...userInfo }
      // 将token存储到Redis中，永久存储
      this.app.redis.set('APP_' + userInfo.token, JSON.stringify(_cacheUser))
      this.success({ ...userInfo })
    } else {
      this.fail('用户名或密码错误')
    }
  }

  /**
   * @Summary 登录
   * @Router post /fed-api/open/login
   * @Request body loginForm *body
   * @Response 200 JsonResult 操作成功
   */
  async login() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const userName = payload.userName
    if(!userName) {
      this.fail('帐号不能为空')
      return
    }
    const password = payload.password
    if(!password) {
      this.fail('密码不能为空')
      return
    }

    const userInfo = await this.getProfile({userName,password})
    const _cacheUser = { ...userInfo }
    
    if (userInfo) {
      // 获取用户角色
      const roleData = await service.sysRoleService.executeRawSQL(`
        SELECT r.*
        FROM sys_role r
        INNER JOIN sys_account_role ar ON r.id = ar.role_id
        WHERE ar.account_id = ? and ar.is_deleted = 0 and r.is_deleted = 0;
      `, [userInfo.id])
      if (roleData && roleData.length > 0) {
        userInfo.roles = JSON.parse(JSON.stringify(roleData))
        const roleIds = userInfo.roles.map(item => item.id)
        _cacheUser.roleIds = roleIds.join(',')
        // 根据角色获取用户权限
        const permissionData = await service.sysPermissionService.executeRawSQL(`
          SELECT p.*
          FROM sys_permission p
          INNER JOIN sys_role_permission rp ON p.id = rp.permission_id
          INNER JOIN sys_role r ON rp.role_id = r.id
          WHERE r.id IN (?) and p.is_deleted = 0 and rp.is_deleted = 0 and r.is_deleted = 0
        `, [roleIds.join(',')])
        userInfo.permissions = JSON.parse(JSON.stringify(permissionData))
        this.app.redis.set('ADMIN_' + userInfo.token, JSON.stringify(_cacheUser), 'EX', 60 * 60)
        this.success({ ...userInfo })
      } else {
        this.fail('当前用户无用户角色，请联系管理员')
      }
    } else {
      this.fail('用户名/密码错误')
    }
  }

  /**
   * @Summary 获取用户权限
   * @Router get /fed-api/users/powers
   * @Response 200 JsonResult 操作成功
   */
  async powersByUserId() {
    const { ctx, service } = this
    const accountId = ctx.header.accountId
    // 获取用户角色
    const roleData = await service.sysRoleService.executeRawSQL(`
      SELECT r.*
      FROM sys_role r
      INNER JOIN sys_account_role ar ON r.id = ar.role_id
      WHERE ar.account_id = ? and r.is_deleted = 0 and ar.is_deleted = 0
    `, [accountId])


    if (roleData && roleData.length > 0) {
      const roleIds = roleData.map(item => item.id)
      // 根据角色获取用户权限
      const permissionData = await service.sysPermissionService.executeRawSQL(`
        SELECT p.*
        FROM sys_permission p
        WHERE p.id IN (
            SELECT rp.permission_id
            FROM sys_role_permission rp
            WHERE rp.role_id IN (?) AND rp.is_deleted = 0
        ) AND p.type = 0 And p.is_deleted = 0
        ORDER BY p.seq asc
      `, [roleIds])

      this.success(this.generateTree(JSON.parse(JSON.stringify(permissionData))))
    }
  }

    /**
   * @Summary 获取用户权限
   * @Router get /fed-api/users/permission
   * @Response 200 JsonResult 操作成功
   */
    async permissionByUserId() {
      const { ctx, service } = this
      const accountId = ctx.header.accountId

      console.info(accountId)
      // 获取用户角色
      const roleData = await service.sysRoleService.executeRawSQL(`
        SELECT r.*
        FROM sys_role r
        INNER JOIN sys_account_role ar ON r.id = ar.role_id
        WHERE ar.account_id = ? and r.is_deleted = 0 and ar.is_deleted = 0
      `, [accountId])
  
       
      if (roleData && roleData.length > 0) {
        const roleIds = roleData.map(item => item.id)
        // 根据角色获取用户权限
        const permissionData = await service.sysPermissionService.executeRawSQL(`
          SELECT p.*
          FROM sys_permission p
          WHERE p.id IN (
              SELECT rp.permission_id
              FROM sys_role_permission rp
              WHERE rp.role_id IN (?) AND rp.is_deleted = 0
          ) AND p.type = 1 And p.is_deleted = 0
          ORDER BY p.seq asc
        `, [roleIds])
  

        this.success(permissionData.map(item => item.permission))
      } else {
        this.fail('当前用户无用户角色，请联系管理员')
      }
    }


  /**
   * @Summary 退出
   * @Router get /fed-api/open/logout
   * @Request path string token token
   * @Response 200 JsonResult 操作成功
   */
  async logout() {
    const { ctx, app } = this
    app.redis.del('ADMIN_' +  ctx.header['fed-token'])
    // const resultToken = await service.tTokenService.getByToken(params.token)
    // await service.tTokenService.update('TToken', resultToken.id, {status: 'EXPIRES_INVALID',})
    this.success()
  }

  async checkToken(tickets, token) {
    const ticket1 = tickets.ticket1
    const ticket2 = tickets.ticket2

    let resData = ''

    try {
      resData = await jwt.verify(token, ticket1)
    } catch (error) {
      console.info(error)
    }
    try {
      resData = await jwt.verify(token, ticket2)
    } catch (error) {
      console.info(error)
    }
    if (resData) {
      return {
        code: 1,
        name: resData.sub,
      }
    } else {
      return {
        code: 0,
        error: '登录校验失败',
      }
    }
  }

  generateToken(data) {
    var s = []
    var hexDigits = data
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid.replace(/-/g, '')
  }
  async getProfile(userInfo) {
    const password = userInfo.password
    userInfo = await this.ctx.model['SysAccount'].findOne({
      where: { userName: userInfo.userName },
    })

    if (userInfo) {
      if (userInfo.status === 'LOCKING') {
        return { msg: '当前账户已锁定', code: 0 }
      }

      const isMatch = bcrypt.compareSync(password, userInfo.password);
      if (!isMatch) {
        this.fail('密码错误')
        return null
      } else {
        const token = this.generateToken(uuid() + userInfo.userName)
        this.updateToken(token, userInfo)

        return {
          id: userInfo.id,
          userName: userInfo.userName,
          avatar: userInfo.avatar,
          token,
          name: userInfo.name
        }
      }      
    } else {
     this.fail('用户名/密码错误')
     return null
    }
  }

  async updateToken(token, result) {
    // 单点登录判断
    const tokens = await this.service.sysTokenService.list('SysToken', {
      accountId: result.id,
      status: 'NORMAL',
    })
    if (tokens.length > 0) {
      tokens.map(async (item) => {
        await this.service.sysTokenService.update('SysToken', item.id, {
          status: 'EXCLUSION_INVALID',
        })
      })
    }
    this.service.sysTokenService.save('SysToken', {
      token,
      accountId: result.id,
      remarks: result.name,
      status: 'NORMAL',
      expiresTime: dayjs().add(60 * 60 * 2, 'second'),
      lastFreshTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    })
  }
  generateTree(data, parentId = '-1') {
    const tree = [];
    for (const item of data) {
      if (item.parentId === parentId) {
        const children = this.generateTree(data, item.id);
        if (children.length) {
          item.children = children;
        }
        tree.push(item);
      }
    }
    return tree;
  }
  
}

module.exports = IndexController
