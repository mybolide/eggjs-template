// 任务表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const tasksGet = (data) => get(`${baseUrl}/fed-api/v1-0/tasks`, data)

// 添加
export const tasksPost = (data) => post(`${baseUrl}/fed-api/v1-0/tasks`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/tasks/page`, data)

// 修改
export const tasksByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/tasks/{id}`.replace('{id}', id), data)

// 删除
export const tasksByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/tasks/{id}`.replace('{id}', id), data)

// 查询详情
export const tasksByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/tasks/{id}`.replace('{id}', id), data)

