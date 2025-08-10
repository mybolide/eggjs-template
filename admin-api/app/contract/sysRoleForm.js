'use strict';
module.exports = {
    // 默认接口类型
    sysRoleForm: {
        //应用id
        appId:{type: 'string',  required: false, description:'应用id' },
        //角色编码
        code:{type: 'string',  required: true, description:'角色编码' },
        //角色类型:角色类型:0 管理角色,1普通角色
        type:{type: 'integer',  required: false, description:'角色类型:角色类型:0 管理角色,1普通角色' },
        //角色名称
        name:{type: 'string',  required: true, description:'角色名称' },
        //角色描述
        description:{type: 'string',  required: true, description:'角色描述' },
        // 是否删除
        isDeleted:{type: 'integer',  required: false, description:'' },
    }
};
