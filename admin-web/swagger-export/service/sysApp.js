// 系统应用服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const sysAppGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysApp`, data)

// 添加
export const sysAppPost = (data) => post(`${baseUrl}/fed-api/v1-0/sysApp`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysApp/page`, data)

// 修改
export const sysAppByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysApp/{id}`.replace('{id}', id), data)

// 删除
export const sysAppByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysApp/{id}`.replace('{id}', id), data)

// 查询详情
export const sysAppByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysApp/{id}`.replace('{id}', id), data)

