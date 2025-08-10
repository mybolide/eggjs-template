'use strict';
module.exports = {
    // 默认接口类型
    sysAppForm: {
        //应用编码
        code:{type: 'string',  required: false, description:'应用编码' },
        //系统名称
        name:{type: 'string',  required: false, description:'系统名称' },
        //图标
        icon:{type: 'string',  required: false, description:'图标' },
        //描述
        description:{type: 'string',  required: false, description:'描述' },
        //排序
        orders:{type: 'integer',  required: false, description:'排序' },
        //前缀
        prefix:{type: 'string',  required: false, description:'前缀' },
        //应用类型0内部 1微前端 2普通项目
        appType:{type: 'integer',  required: false, description:'应用类型0内部 1微前端 2普通项目' },
        //是否是超级管理系统0否1是
        isSuperApp:{type: 'integer',  required: false, description:'是否是超级管理系统0否1是' },
        // 是否删除
        isDeleted:{type: 'integer',  required: false, description:'' },
    }
};
