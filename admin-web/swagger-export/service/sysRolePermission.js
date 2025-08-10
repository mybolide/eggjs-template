// 角色权限表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const sysRolePermissionGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysRolePermission`, data)

// 添加
export const sysRolePermissionPost = (data) => post(`${baseUrl}/fed-api/v1-0/sysRolePermission`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysRolePermission/page`, data)

// 修改
export const sysRolePermissionByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysRolePermission/{id}`.replace('{id}', id), data)

// 删除
export const sysRolePermissionByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysRolePermission/{id}`.replace('{id}', id), data)

// 查询详情
export const sysRolePermissionByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysRolePermission/{id}`.replace('{id}', id), data)

