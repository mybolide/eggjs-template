import request from '@/utils/request'

// 保存
export function saveModel(module, model) {
  return request({
    url: `/${module}`,
    method: 'post',
    data: model
  })
}

// 更新
export function updateModel(module, model) {
  return request({
    url: `/${module}/${model.id}`,
    method: 'put',
    data: model
  })
}

// 根据id删除
export function deleteModelById(module, id) {
  return request({
    url: `/${module}/${id}`,
    method: 'delete'
  })
}

// 根据id查询详情
export function getModelById(module, id) {
  return request({
    url: `/${module}/${id}`,
    method: 'get'
  })
}

// 根据条件查询所有
export function getModels(module, condition) {
  return request({
    url: `/${module}`,
    method: 'get',
    params: condition
  })
}

// 分页查询
export function getModelPage(module, condition) {
  return request({
    url: `/${module}/page`,
    method: 'get',
    params: condition
  })
}

// 通用查询
export function query(url, condition) {
  return request({
    url: url,
    method: 'get',
    params: condition
  })
}

// 对象深度拷贝
export function deepCopyModel(source) {
  const target = {}
  let key
  for (key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof (source[key]) === 'object' && source[key] != null) {
        target[key] = Array.isArray(source[key]) ? [] : {}
        deepCopyModel(source[key], target[key])
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
