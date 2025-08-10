// 农场表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const farmersGet = (data) => get(`${baseUrl}/fed-api/v1-0/farmers`, data)

// 添加
export const farmersPost = (data) => post(`${baseUrl}/fed-api/v1-0/farmers`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/farmers/page`, data)

// 修改
export const farmersByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/farmers/{id}`.replace('{id}', id), data)

// 删除
export const farmersByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/farmers/{id}`.replace('{id}', id), data)

// 查询详情
export const farmersByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/farmers/{id}`.replace('{id}', id), data)

