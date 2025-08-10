// 账号信息服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const sysAccountGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysAccount`, data)

// 添加
export const sysAccountPost = (data) => post(`${baseUrl}/fed-api/v1-0/sysAccount`, data)

// 获取视察员工列表
export const inspectorsGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysAccount/inspectors`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysAccount/page`, data)

// 修改密码
export const accountPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysAccount/password/account`.replace('{id}', id), data)

// 修改密码
export const passwordPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysAccount/password`.replace('{id}', id), data)

// 修改
export const sysAccountByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysAccount/{id}`.replace('{id}', id), data)

// 删除
export const sysAccountByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysAccount/{id}`.replace('{id}', id), data)

// 查询详情
export const sysAccountByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysAccount/{id}`.replace('{id}', id), data)

