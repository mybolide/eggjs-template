'use strict';
module.exports = {
    JsonResult: {
        success: { type: 'number' }, // 结果
        data: { type: 'string', example: {} }, // 服务器返回的数据
        code: { type: 'integer', example: 0 },
    }
};
