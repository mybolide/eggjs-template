'use strict';
module.exports = {
    // 默认接口类型
    loginForm: {
        //域帐号
        userName:{type: 'string',  required: true, description:'域帐号' },
        //域密码
        password:{type: 'string',  required: true, description:'域密码' }
    }
};
