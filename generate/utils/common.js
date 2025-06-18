/**
 * 转驼峰
 * @param str
 * @returns {*}
 */
function tranformStr (str) {
    var re = /[-_](\w)/g
    return str.replace(re, function ($0, $1) {
        return $1.toUpperCase()
    })
}

/**
 * 首字母转大写
 * @type {{tranformStr: (function(*): *)}}
 */

function upperCaseFistkey(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
}



module.exports = {
    tranformStr,
    upperCaseFistkey
}