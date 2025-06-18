const { Controller } = require('egg');

/**
 * @Controller 文件上传服务控制器 uploadFile-controller
 */

class HomeController extends Controller {
  /**
   * @Router DELETE /home/{id}
   * @Request header string authentication 身份验证token
   * @Request path string id 用户id
   * @Request query string name
   * @Request query integer pageNum 页码
   * @Request query integer pageSize 每页条数
   * @Response 200 JsonResult 操作结果
   * @Summary 测试
   * @Description 返回当前登录用户的信息
   */
  async index() {
    const { ctx } = this;
    console.log(ctx.params);
    ctx.body = ctx.request.path;
  }

  /**
   * @Router POST /test
   * @Request body demoForm 请求体
   * @Response 200 JsonResult 操作结果
   * @Summary 测试2
   * @Description 返回当前登录用户的信息
   */
  async test() {
    const { ctx } = this;
    ctx.body = { csrfToken: ctx.csrf };
  }
}

module.exports = HomeController;
