const BaseController = require("../framework/BaseController");
const bcrypt = require("bcryptjs");

/**
 * @Controller 账号信息服务控制器 sysAccount-controller
 */
class IndexController extends BaseController {
  /**
   * @Summary 查询列表
   * @Router get /fed-api/v1-0/sysAccount
   * @Request header string fed-token
   * @Response 200 JsonResult 操作成功
   */
  async list() {
    const { service } = this;
    const data = await service.sysAccountService.list("SysAccount");
    this.success(data);
  }

  /**
   * @Summary 获取视察员工列表
   * @Router get /fed-api/v1-0/sysAccount/inspectors
   * @Request header string fed-token
   * @Response 200 JsonResult 操作成功
   */
  async getInspectors() {
    const { service } = this;
    
    const sql = `
SELECT 
    sa.id,
    sa.avatar,
    sa.name,
    sa.user_name
FROM sys_account sa
INNER JOIN sys_account_role sar ON sa.id = sar.account_id 
    AND sar.is_deleted = 0
INNER JOIN sys_role sr ON sar.role_id = sr.id 
    AND sr.is_deleted = 0
WHERE sa.is_deleted = 0 
    AND sr.code = '20002'
ORDER BY sa.id
    `;
    
    const data = await service.sysAccountService.executeRawSQL(sql);
    this.success(data);
  }

  /**
   * @Summary 分页查询
   * @Router get /fed-api/v1-0/sysAccount/page
   * @Request header string fed-token
   * @Request query integer pageNum eg:1 页码
   * @Request query integer pageSize eg:10 每页个数
   * @Response 200 JsonResult 操作成功
   */
  async page() {
    const { ctx, service } = this;
    const query = ctx.query;
    const sql = `
SELECT 
    sa.id,
    sa.avatar,
    sa.name,
    sa.user_name,
    sa.status,
    GROUP_CONCAT(sr.name) as roleNames
FROM sys_account sa
LEFT JOIN sys_account_role sar ON sa.id = sar.account_id 
    AND sar.is_deleted = 0
LEFT JOIN sys_role sr ON sar.role_id = sr.id 
    AND sr.is_deleted = 0
WHERE sa.is_deleted = 0
GROUP BY sa.id, sa.avatar, sa.name, sa.password, sa.user_name, 
         sa.tenant_code, sa.tenant_name, sa.status
    `
    const data = await service.sysAccountService.queryWithPagination(sql, query.pageNum, query.pageSize);
    this.success(data);
  }


  /**
   * @Summary 修改密码
   * @Router put /fed-api/v1-0/sysAccount/password/account
   * @Request header string fed-token
   * @Request path integer id eg:1 id
   * @Request body uploadAccountPasswordForm *body
   * @Response 200 JsonResult 操作成功
   */
  async updatePasswordAccount() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};


    const userInfo = await service.sysAccountService.getById("SysAccount", ctx.header.accountId);

    const isMatch = bcrypt.compareSync(payload.password, userInfo.password);
    console.info(isMatch)
    if (!isMatch) {
      this.fail("旧密码错误");
      return
    }

    if (payload.newPassword !== payload.confirmNewPassword) {
      this.fail("两次输入的新密码不一致");
      return
    }

    const hashedPassword = bcrypt.hashSync(payload.newPassword, 10);

    const flag = await service.sysAccountService.update("SysAccount", userInfo.id, {
      password: hashedPassword,
    });
    console.info(flag);
    if (flag) {
      this.success({});
    } else {
      this.fail();
    }
  }
  /**
   * @Summary 修改密码
   * @Router put /fed-api/v1-0/sysAccount/password
   * @Request header string fed-token
   * @Request path integer id eg:1 id
   * @Request body sysAccountForm *body
   * @Response 200 JsonResult 操作成功
   */
  async updatePassword() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    let password = payload.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    password = hashedPassword;

    const flag = await service.sysAccountService.update("SysAccount", payload.id, {
      password,
    });
    console.info(flag);
    if (flag) {
      this.success({});
    } else {
      this.fail();
    }
  }
  /**
   * @Summary 添加
   * @Router post /fed-api/v1-0/sysAccount
   * @Request header string fed-token
   * @Request body sysAccountForm *body
   * @Response 200 JsonResult 操作成功
   */
  async create() {
    const { ctx, service } = this;

    const payload = ctx.request.body || {};
    const error = await this.validateParams(ctx.app.rule.sysAccountForm, payload)
    if(error){
        this.fail(error)
        return
    }
    const userRoles = payload.roleIds;
    let userId = payload.id;
    let flag = "";
    if (userId) {
      flag = await service.sysAccountService.update("SysAccount", userId, {
        userName: payload.userName,
        avatar: payload.avatar,
        name: payload.name,
      });
    } else {
      let password = payload.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      payload.password = hashedPassword;
      flag = await service.sysAccountService.save("SysAccount", {
        userName: payload.userName,
        avatar: payload.avatar,
        password: payload.password,
        name: payload.name,
        status: "NORMAL",
      });
      userId = flag.id;
    }

    // 添加用户角色
    const oldRoleData = await service.sysAccountRoleService.list("SysAccountRole", { accountId: userId });
    if (oldRoleData && oldRoleData.length > 0) {
      // 使用 Promise.all 等待所有删除操作完成
      await Promise.all(
        oldRoleData.map(item => service.sysAccountRoleService.removeById("SysAccountRole", item.id))
      );
    }
    
    // 使用 Promise.all 等待所有角色添加操作完成
    if (userRoles && userRoles.length > 0) {
      await Promise.all(
        userRoles.map(item => 
          service.sysAccountRoleService.save("SysAccountRole", {
            accountId: userId,
            roleId: item,
            roleType: "ORDINARY",
          })
        )
      );
    }
    if (flag) {
      this.success({});
    } else {
      this.fail();
    }
  }

  /**
   * @Summary 修改
   * @Router put /fed-api/v1-0/sysAccount/{id}
   * @Request header string fed-token
   * @Request path integer id eg:1 id
   * @Request body sysAccountForm *body
   * @Response 200 JsonResult 操作成功
   */
  async update() {
    const { ctx, service } = this;
    const params = ctx.params;
    const payload = ctx.request.body || {};
    const flag = await service.sysAccountService.update("SysAccount", params.id, payload);
    if (flag) {
      this.success({});
    } else {
      this.fail();
    }
  }

  /**
   * @Summary 删除
   * @Router delete /fed-api/v1-0/sysAccount/{id}
   * @Request header string fed-token
   * @Request path integer id eg:1 id
   * @Response 200 JsonResult 操作成功
   */
  async deleteById() {
    const { ctx, service } = this;
    const params = ctx.params;
    const flag = await service.sysAccountService.removeById("SysAccount", params.id);
    if (flag) {
      this.success({});
    } else {
      this.fail();
    }
  }

  /**
   * @Summary 查询详情
   * @Router get /fed-api/v1-0/sysAccount/{id}
   * @Request header string fed-token
   * @Request path integer id eg:1 id
   * @Response 200 JsonResult 操作成功
   */
  async getById() {
    const { ctx, service } = this;
    const params = ctx.params;
    const data = await service.sysAccountService.getById("SysAccount", params.id);
    this.success(data);
  }
}

module.exports = IndexController;
