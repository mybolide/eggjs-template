'use strict';
module.exports = {
    // 默认接口类型
    sysRolePermissionForm: {
        //角色id
        roleId:{type: 'string',  required: true, description:'角色id' },
        //权限id
        permissionId:{type: 'string',  required: true, description:'权限id' },
        // 是否删除
        isDeleted:{type: 'integer',  required: false, description:'' },
    }
};
