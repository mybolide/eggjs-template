var fs = require('fs-extra')
var path = require('path')
var handlebars = require('handlebars')

function tranformStr (str) {
  var re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}

const moduleName = 'budgets'
const child = 'index'
const apiFlag = true // 是否重新生成api
const viewFlag = false
const data = { name: moduleName + '-' + child, moduleName, page: tranformStr(moduleName) }

// 读取文件
function readFile (filePath) {
  filePath = path.join(`${__dirname}/`, filePath)
  return fs.readFileSync(filePath, 'utf8')
}

// 写文件
function writeFile (filePath, name, data) {
  const rootPath = path.resolve(__dirname, filePath)
  filePath = path.join(`${rootPath}`, name)
  //console.info(filePath)
  fs.outputFile(filePath, data)
}

// 文件路径
function getFilePath (filePath) {
  return path.join(path.resolve(__dirname, '..'), filePath)
}

// 判断模块是否存在，如果存在则不创建
const rootPath = path.join(
  path.resolve(__dirname, '..'),
  `src/views/${moduleName}/${child}`
)
if (fs.existsSync(rootPath)) {
  console.error(`模块${moduleName}已存在，请确认`)
  return
}


var apiObj = {}
module.exports = function (apiObj, importArr) {
  for (var key in apiObj) {
    // console.info(key)
    if(key === 'host') continue
    var fileName = key
    var data = apiObj[key]
    // console.info(data)
    // 获取所有的api接口
    var apiArr = []
    for (var innerKey in data) {
      if(innerKey === 'tag') continue
      apiArr.push(data[innerKey])
    }
    var serviceTpl = readFile('templates/service.js.tpl')
    serviceTpl = handlebars.compile(serviceTpl)
    var _tempFileData = {
      importArr,
      apiArr,
      tag: data.tag
    }
    var serviceData = serviceTpl(_tempFileData)
    writeFile('./service', fileName.replace('Controller', '') + `.js`, serviceData)
    //  console.info(apiArr)
  }
}