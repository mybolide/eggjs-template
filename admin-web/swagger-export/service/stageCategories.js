// 生产阶段分类表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const stageCategoriesGet = (data) => get(`${baseUrl}/fed-api/v1-0/stageCategories`, data)

// 添加
export const stageCategoriesPost = (data) => post(`${baseUrl}/fed-api/v1-0/stageCategories`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/stageCategories/page`, data)

// 修改
export const stageCategoriesByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/stageCategories/{id}`.replace('{id}', id), data)

// 删除
export const stageCategoriesByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/stageCategories/{id}`.replace('{id}', id), data)

// 查询详情
export const stageCategoriesByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/stageCategories/{id}`.replace('{id}', id), data)

