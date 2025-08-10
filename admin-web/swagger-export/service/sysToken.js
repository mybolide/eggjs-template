// 用户登录token服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const sysTokenGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysToken`, data)

// 添加
export const sysTokenPost = (data) => post(`${baseUrl}/fed-api/v1-0/sysToken`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysToken/page`, data)

// 修改
export const sysTokenByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysToken/{id}`.replace('{id}', id), data)

// 删除
export const sysTokenByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysToken/{id}`.replace('{id}', id), data)

// 查询详情
export const sysTokenByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysToken/{id}`.replace('{id}', id), data)

