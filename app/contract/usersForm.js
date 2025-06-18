'use strict';
module.exports = {
    // 默认接口类型
    usersForm: {
        //user name
        name:{type: 'string',  required: true, description:'user name'},
        //user age
        age:{type: 'integer',  required: false, description:'user age' },
    }
};
