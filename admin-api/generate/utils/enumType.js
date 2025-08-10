const enumType = {
    INT: "integer",
    VARCHAR: "string"
}


module.exports = function(key) {
    const filterKeyArr = Object.keys(enumType).filter(item => key.indexOf(item) > -1)
    if (filterKeyArr.length > 0) {
        return enumType[filterKeyArr[0]]
    } else {
        return 'string'
    }
}