const BaseController = require("../framework/BaseController");
const upload = require("../utils/upload");

/**
 * @Controller 上传服务控制器 upload-controller
 */
class UploadController extends BaseController {

    /**
    * @Summary 文件上传
    * @Router post /fed-api/v1-0/upload
    * @Request header string authentication
    * @Request formData file *body
    * @Response 200 JsonResult 操作成功
    */
    async uploadFile() {
        const { ctx } = this;
        const file = ctx.request.files[0];

        const result = await upload.uploadFile(file.filepath, file.filename);
        if (result.success) {
            const url = result.url?.replace('http://', 'https://');
            this.success(url);
        } else {
            this.fail(result.error);
        }
    }
}

module.exports = UploadController;
