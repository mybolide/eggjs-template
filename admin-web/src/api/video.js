// 视频服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表 
export const videoGet = (data) => get(`${baseUrl}/fed-api/v1-0/video`, data)

// 添加 
export const videoPost = (data) => post(`${baseUrl}/fed-api/v1-0/video`, data)

// 分页查询 
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/video/page`, data)

// 修改 
export const videoByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/video/{id}`.replace('{id}', id), data)

// 删除 
export const videoByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/video/{id}`.replace('{id}', id), data)

// 查询详情 
export const videoByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/video/{id}`.replace('{id}', id), data)

