'use strict';
module.exports = {
    // 默认接口类型
    uploadForm: {
        // 路径
        url: { type: 'string', required: false, description: '路径' },
        // 类型
        type: { type: 'string', required: false, description: '类型' },
        // 标题
        title: { type: 'string', required: false, description: '标题' },
    }
};
