'use strict';
module.exports = {
    // 默认接口类型
    uploadAccountPasswordForm: {
        // 新密码
        newPassword:{type: 'string',  required: false, description:'新密码' },
        // 重复新密码
        confirmNewPassword:{type: 'string',  required: false, description:'重复新密码' },
    }
};
