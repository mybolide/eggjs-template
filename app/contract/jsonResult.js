'use strict';
module.exports = {
    // 默认接口类型
    JsonResult: { // @response 200 JsonResult 操作结果，名字与相应结果对应
        success: { type: 'boolean' }, // 结果
        data: { type: 'string', example: {} }, // 服务器返回的数据
        code: { type: 'integer', example: 0 },
    }
};
