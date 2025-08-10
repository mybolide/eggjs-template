const {readFile,  writeFile} = require('./fileOperate')
const { upperCaseFistkey } = require('./common')
const path = require('path')
const handlebars = require('handlebars')


const rootPath = path.join(__dirname, '../..')
// 生成contract文件
// 读取contract文件模版

function asyncContract(fileType, tableName, data) {
    let contractTpl = readFile(path.join(rootPath, `/generate/templates/${fileType}.js.tpl`))
    contractTpl = handlebars.compile(contractTpl)
    const _tempFileData = {
        data,
        tableName,
        modelName: upperCaseFistkey(tableName)
    }
    const suffix = fileType === 'contract'  ? 'Form' : upperCaseFistkey(fileType)
    var contractData = contractTpl(_tempFileData)
    writeFile(`${rootPath}/app/${fileType}`, `${tableName}${suffix}.js`, contractData)
}


module.exports = asyncContract