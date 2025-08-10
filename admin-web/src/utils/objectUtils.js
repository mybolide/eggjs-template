// 对象拷贝
export function deepCopy(source) {
  const target = {}
  let key
  for (key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof (source[key]) === 'object' && source[key] != null) {
        target[key] = Array.isArray(source[key]) ? [] : {}
        deepCopy(source[key], target[key])
      } else {
        if (source[key] == null) {
          target[key] = ''
        } else {
          target[key] = source[key]
        }
      }
    }
  }
  return target
}
