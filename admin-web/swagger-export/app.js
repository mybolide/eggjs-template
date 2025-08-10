var http = require('./utils/http');
var exportFile = require('./export')


var requireArr = [
  "import config from '../config/index'",
  "import { post, get, deletes, put, patch } from '../utils/request2'",
  "const baseUrl = config.baseUrl"
]


var _tempApi = {}

function tranformStr (str) {
  var re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}
function formatFnName (path, method) {
  var pathArr = path.split('/')
  // 获取最后一个值
  var lastKey = pathArr[pathArr.length - 1]
  if (lastKey.indexOf('{') > -1) {
    lastKey = pathArr[pathArr.length - 2]
  }
  var name = tranformStr(`${lastKey}-${method}`)
  if (path.indexOf('{id}') > -1) {
    name = tranformStr(`${lastKey}ById-${method}`)
  }

  return name
}

function formatUrl (url, paramsArr) {
  url += '`'
  var pathReplaceArr = []
  var queryArr = []
  for (var i = 0; i < paramsArr.length; i++) {
    var params = paramsArr[i]
    var name = params.name
    var queryIn = params.in
    if (queryIn === 'path') {
      pathReplaceArr.push("replace('{" + name + "}', " + name + ")")
    }
    if (queryIn === 'query') {
      queryArr.push(name)
    }
  }

  if (pathReplaceArr.length > 0) {
    url = url + "." + pathReplaceArr.join('.')
  }
  return url
}

function formatParams (paramsObj) {
  var resData = []
  for (var i = 0; i < paramsObj.length; i++) {
    var params = paramsObj[i]
    var queryIn = params.in
    if (queryIn === 'path') {
      resData.push(params.name)
    }
  }
  resData.push('data')
  return resData
}

var formatObj = {}
http.get('http://localhost:10882/swagger.json', {}, function (res) {
  console.info(res)
  res = JSON.parse(res)
  var tags = res.tags
  var paths = res.paths
  var i = 0, length = tags.length
  for (i; i < length; i++) {
    var tag = tags[i]
    // _tempApi[tag.name] = {}
    formatObj[tag.name] = tranformStr(tag.description.replace(/\s/g, '-'))
  }

  _tempApi.host = res.host
  for (var key in paths) {
    const path = paths[key]
    const methodsArr = {}
    for (var method in path) {
      var fn = path[method]
      var tags = fn['tags']
      var parameters = fn['parameters']
      var tag = null
      if (tags.length > 0) {
        var tag = tags[0]
      }
      const paramsObj = []
      const paramsArr = []
      for (var i = 0; i < parameters.length; i++) {
        var parameter = parameters[i]
        if (parameter.in !== 'header') {
          var name = parameter.name
          if (name.indexOf('Form') > -1) {
            name = 'data'
          }
          paramsArr.push(name)
          name = {
            name: parameter.name,
            in: parameter.in
          }

          paramsObj.push(name)
        }

      }

      var methedFn = {
        url: formatUrl(key, paramsObj),
        method: method === 'delete' ? 'deletes' : method,
        summary: fn.summary,
        fnName: formatFnName(key, method),
        parameters: formatParams(paramsObj).join(', ')//paramsArr.join(', ')
      }
      var tKey = formatObj[tag]
      //tag = formatObj[tag]
      tKey = tKey.replace(tKey[0], tKey[0].toLowerCase());
      _tempApi[tKey] = _tempApi[tKey] || {}
      _tempApi[tKey].tag = tag
      _tempApi[tKey][`${key}_${method}`] = methedFn
    }
  }


  // console.info(_tempApi)
  exportFile(_tempApi, requireArr)
  //console.info(tags.tags)
})