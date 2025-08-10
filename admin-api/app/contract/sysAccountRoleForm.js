'use strict';
module.exports = {
    // 默认接口类型
    sysAccountRoleForm: {
        //用户id
        accountId:{type: 'string',  required: true, description:'用户id' },
        //角色id
        roleId:{type: 'string',  required: true, description:'角色id' },
        //是否删除
        isDeleted:{type: 'integer',  required: false, description:'' }
    }
};
