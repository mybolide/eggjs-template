var fs = require('fs-extra')
var path = require('path')
var common = {
  //继承
  extend: function (src, des) {
    for (var tmp in src) {
      if (src.hasOwnProperty(tmp)) {
        des[tmp] = src[tmp];
      }
    }
    return des;
  },
  // 读取文件
  readFile: function (filePath) {
    filePath = path.join(`${__dirname}/`, filePath);
    return fs.readFileSync(filePath, "utf8");
  },

  // 写文件
  writeFile: function (filePath, name, data) {
    const rootPath = path.resolve(__dirname, filePath);
    filePath = path.join(`${rootPath}`, name);
    //console.info(filePath)
    fs.outputFile(filePath, data);
  },
};

module.exports = common;
