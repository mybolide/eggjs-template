// Permission service controller

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表 
export const sysPermissionGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysPermission`, data)

// 添加 
export const sysPermissionPost = (data) => post(`${baseUrl}/fed-api/v1-0/sysPermission`, data)

// 分页查询 
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysPermission/page`, data)

// 修改 
export const sysPermissionByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysPermission/{id}`.replace('{id}', id), data)

// 删除 
export const sysPermissionByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysPermission/{id}`.replace('{id}', id), data)

// 查询详情 
export const sysPermissionByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysPermission/{id}`.replace('{id}', id), data)

