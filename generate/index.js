const Sequelize = require('sequelize');


const fs = require('fs-extra')
const path = require('path')
const { tranformStr } = require('./utils/common')
const writeFile = require('./utils/writeFile')
const formatType = require('./utils/enumType')
const excludeField = require('./utils/excludeField')

const rootPath = path.join(__dirname, '..')

const config = fs.readJsonSync(rootPath + '/automate.config.json')
const sequelize = new Sequelize(config.dbOptions);

const queryInterface = sequelize.getQueryInterface();


function _create (tableName, prefix, isAuth) {
    queryInterface.describeTable(tableName).then(attrs => {
        const attrObj = Object.keys(attrs).map(item => {
            const attrName = tranformStr(item)
            const resItem = attrs[item]
            resItem.attrName = attrName
            resItem.jsType = formatType(resItem.type)
            resItem.required = !resItem.allowNull
            resItem.isAuth = isAuth
            return resItem
        })
        // 表内所有值
        writeFile('contract', tranformStr(tableName.replace(prefix, '')), {
            fieldData: attrObj.filter(item => excludeField.indexOf(item.attrName) === -1)
        })
        // controller
        writeFile('controller', tranformStr(tableName.replace(prefix, '')), {
            serviceName: config.options.serviceName[0],
            isAuth
        })
        // service
        writeFile('service', tranformStr(tableName.replace(prefix, '')), {
            serviceName: config.options.serviceName[0]
        })
        sequelize.close();
    })
}
// 获取表的属性
async function getTableStructures (tableNames, prefixs, isAuth) {
    await Promise.all(tableNames.map((tableName, index) => {
        const prefix = prefixs.length - 1 >= index ? prefixs[index] : ''
        _create(tableName, prefix, isAuth)
    }))
}
getTableStructures(config.options.tables, config.options.prefix, config.options.isAuth)

