const BaseController = require("../framework/base/BaseController")
const upload = require("../utils/upload")
const CryptoJS = require('crypto-js')
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const dayjs = require("dayjs")
const path = require("path")
/**
 * @Controller 上传服务控制器 upload-controller
 */
class IndexController extends BaseController {

  /**
* @summary 文件上传
* @router post /fed-api/v1-0/upload
* @Request header string x-token
* @request formData file *body
* @response 200 JsonResult 操作成功
*/
  async upload () {
    const { ctx, service } = this
    const type = ctx.query.type
    const file = ctx.request.files[0]
    const stream = fs.readFileSync(file.filepath)
    ctx.logger.info('进入上传服务.......', file.mimeType)
    const ext = path.extname(file.filename).toLocaleLowerCase()
    const fileName = CryptoJS.MD5(file.filename + new Date().getTime() + uuidv4()).toString() + ext
    const res = await upload.putFromBuffer(stream, `upload/${dayjs().format('YYYY-MM-DD')}/${fileName}`, ext, file.mimeType)
    // const res = await this.service.uploadService.upload(stream, file, null, ctx.query.resType)
    ctx.logger.info('文件上传返回:%j', res)
    const flag = await service.userGardenService.save('Upload', {
      url: res
    })
    this.success({
      url: flag.url,
      id: flag.id,
      day: dayjs().format('YYYY-MM-DD')
    })
  }
  /**
   * @summary 自定义文件上传
   * @router post /fed-api/v1-0/upload/custom
   * @Request header string x-token
   * @request formData file *body
   * @request query string *name 文件名
   * @request query string *path 二级路径
   * @request query integer resType 类型 1静态资源 2普通资源 默认：2
   * @response 200 JsonResult 操作成功
   */
  async uploadByCustomer () {
    const { ctx, service } = this
    const file = ctx.request.files[0]

    const res = await this.service.uploadService.uploadByCustomer(file, ctx.query.name, ctx.query.path, ctx.query.resType)
    ctx.logger.info('文件上传返回:%j', res)
    this.success(res)
  }
}


module.exports = IndexController;
