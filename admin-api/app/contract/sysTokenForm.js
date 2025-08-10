'use strict';
module.exports = {
    // 默认接口类型
    sysTokenForm: {
        //token
        token:{type: 'string',  required: false, description:'token' },
        //账号id
        accountId:{type: 'string',  required: true, description:'账号id' },
        //失效时间
        expiresTime:{type: 'string',  required: true, description:'失效时间' },
        //最后刷新时间
        lastFreshTime:{type: 'string',  required: true, description:'最后刷新时间' },
        //token状态:NORMAL-正常,EXPIRES_INVALID-失效,EXCLUSION_INVALID-排他失效,LOCKING_INVALID-账号锁定失效
        status:{type: 'string',  required: true, description:'token状态:NORMAL-正常,EXPIRES_INVALID-失效,EXCLUSION_INVALID-排他失效,LOCKING_INVALID-账号锁定失效' },
        //备注
        remarks:{type: 'string',  required: false, description:'备注' },
        // 是否删除
        isDeleted:{type: 'integer',  required: false, description:'' },
    }
};
