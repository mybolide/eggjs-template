// 三方token表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const sysOtherTokenGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysOtherToken`, data)

// 添加
export const sysOtherTokenPost = (data) => post(`${baseUrl}/fed-api/v1-0/sysOtherToken`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysOtherToken/page`, data)

// 修改
export const sysOtherTokenByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysOtherToken/{id}`.replace('{id}', id), data)

// 删除
export const sysOtherTokenByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysOtherToken/{id}`.replace('{id}', id), data)

// 查询详情
export const sysOtherTokenByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysOtherToken/{id}`.replace('{id}', id), data)

