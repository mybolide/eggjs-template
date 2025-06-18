var path = require('path')
var fs = require('fs-extra')

// 读取文件
function readFile (filePath) {
    return fs.readFileSync(filePath, 'utf8')
}

// 写文件
function writeFile (filePath, name, data) {
    filePath = path.join(`${filePath}`, name)
    //console.info(filePath)
    fs.outputFile(filePath, data)
}

module.exports = {
    readFile,
    writeFile
}