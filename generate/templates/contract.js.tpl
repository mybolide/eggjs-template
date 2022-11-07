'use strict';
module.exports = {
    // 默认接口类型
    {{tableName}}Form: {
        {{#each data.fieldData}}
        // {{comment}}
        {{attrName}}: { type: '{{jsType}}', required: {{required}}, description: '{{comment}}' },
        {{/each}}
    }
};
