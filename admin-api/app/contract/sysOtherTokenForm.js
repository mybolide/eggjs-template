'use strict';
module.exports = {
    // 默认接口类型
    sysOtherTokenForm: {
        //token
        token:{type: 'string',  required: false, description:'token' },
        //appkey
        appKey:{type: 'string',  required: true, description:'appkey' },
        //appid
        appId:{type: 'integer',  required: true, description:'appid' },
        //失效时间
        expiresTime:{type: 'string',  required: true, description:'失效时间' },
        //备注
        remarks:{type: 'string',  required: false, description:'备注' },
    }
};
