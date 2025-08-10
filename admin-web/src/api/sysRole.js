// Role service controller

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表 
export const sysRoleGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysRole`, data)

// 添加 
export const sysRolePost = (data) => post(`${baseUrl}/fed-api/v1-0/sysRole`, data)

// 分页查询 
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/sysRole/page`, data)

// 修改 
export const sysRoleByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/sysRole/{id}`.replace('{id}', id), data)

// 删除 
export const sysRoleByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/sysRole/{id}`.replace('{id}', id), data)

// 查询详情 
export const sysRoleByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/sysRole/{id}`.replace('{id}', id), data)

