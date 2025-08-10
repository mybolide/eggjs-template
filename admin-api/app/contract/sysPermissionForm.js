'use strict';
module.exports = {
    // 默认接口类型
    sysPermissionForm: {
        //父级权限id
        parentId:{type: 'string',  required: true, description:'父级权限id' },
        //菜单:0,按钮:1
        type:{type: 'integer',  required: true, description:'菜单:0,按钮:1' },
        //应用id
        appId:{type: 'string',  required: false, description:'应用id' },
        //权限名称
        name:{type: 'string',  required: true, description:'权限名称' },
        //链接地址
        link:{type: 'string',  required: false, description:'链接地址' },
        //权限标识
        permission:{type: 'string',  required: false, description:'权限标识' },
        //权限表达式
        expression:{type: 'string',  required: false, description:'权限表达式' },
        //图标
        icon:{type: 'string',  required: false, description:'图标' },
        //排序字段
        seq:{type: 'integer',  required: true, description:'排序字段' },
        //1.显示 0.隐藏
        hidden:{type: 'integer',  required: false, description:'1.显示 0.隐藏' },
        // 是否删除
        isDeleted:{type: 'integer',  required: false, description:'' },
    }
};
