// 账号角色关联表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const sysAccountRoleGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysAccountRole`, data)

// 添加
export const sysAccountRolePost = (data) => post(`${baseUrl}/fed-api/v1-0/sysAccountRole`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysAccountRole/page`, data)

// 修改
export const sysAccountRoleByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysAccountRole/{id}`.replace('{id}', id), data)

// 删除
export const sysAccountRoleByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysAccountRole/{id}`.replace('{id}', id), data)

// 查询详情
export const sysAccountRoleByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysAccountRole/{id}`.replace('{id}', id), data)

