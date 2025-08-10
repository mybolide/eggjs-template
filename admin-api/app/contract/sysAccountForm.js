'use strict';
module.exports = {
    // 默认接口类型
    sysAccountForm: {
        //真实姓名
        name:{type: 'string',  required: false, description:'真实姓名' },
        //用户名
        userName:{type: 'string',  required: false, description:'用户名' },
        //头像
        avatar:{type: 'string',  required: false, description:'头像' },
        //密码
        password:{type: 'string',  required: false, description:'密码' },
        //用户状态:NORMAL-正常,LOCKING-锁定
        status:{type: 'string',  required: false, description:'用户状态:NORMAL-正常,LOCKING-锁定' },
        //社区id
        tenantCode:{type: 'string',  required: false, description:'社区id' },
        //是否删除
        isDeleted:{type: 'integer',  required: false, description:'' }
    }
};
