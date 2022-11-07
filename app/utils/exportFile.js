const fs = require('fs-extra')
const path = require('path')
const handlebars = require('handlebars')


// 读取文件
function readFile (filePath) {
  filePath = path.join(`${__dirname}/`, filePath)
  return fs.readFileSync(filePath, 'utf8')
}

// 写文件
function writeFile (filePath, name, data) {
  const rootPath = path.resolve(__dirname, filePath)
  filePath = path.join(`${rootPath}`, name)
  fs.outputFileSync(filePath, data)
}

// 文件路径
function getFilePath (filePath) {
  return path.join('../public', filePath)
}


handlebars.registerHelper('subString', function (str, length) {
  str = str.replace(/[\r\n\ ]/g, "")
  str = str.replace(/[\r\n\ \"]/g, "")
  return str.length > length ? (str.substring(0, length) + '...') : str
})

handlebars.registerHelper('flterImg', function (images) {
  let img = 'https://s.ampmake.com/www/image/ipad-logo.pn'
  if (images) {
    images = JSON.parse(images)
    if (images.length > 0) {
      img = images[0]
    }
  }
  return img
})

handlebars.registerHelper('flterExecute', function (status) {
  if (status * 1 === 1) {
    return 'modify'
  }
  return 'add'

})

handlebars.registerHelper('toJson', function (str) {
  return JSON.parse(str)
})

handlebars.registerHelper('isShowDot', function (length, index) {
  return index < length - 1 ? ',' : ''
})


module.exports = function (tplName, data, fileName) {
  let tpl = readFile(getFilePath(`template/${tplName}`))
  tpl = handlebars.compile(tpl)
  data = tpl({ data: JSON.parse(JSON.stringify(data)) })
  writeFile(getFilePath(`export`), fileName, data)
}
