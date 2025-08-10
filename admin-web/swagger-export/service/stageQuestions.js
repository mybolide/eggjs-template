// 阶段问题表服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 查询列表
export const stageQuestionsGet = (data) => get(`${baseUrl}/fed-api/v1-0/stageQuestions`, data)

// 添加
export const stageQuestionsPost = (data) => post(`${baseUrl}/fed-api/v1-0/stageQuestions`, data)

// 分页查询
export const pageGet = (data) => get(`${baseUrl}/fed-api/v1-0/stageQuestions/page`, data)

// 修改
export const stageQuestionsByIdPut = (id, data) => put(`${baseUrl}/fed-api/v1-0/stageQuestions/{id}`.replace('{id}', id), data)

// 删除
export const stageQuestionsByIdDelete = (id, data) => deletes(`${baseUrl}/fed-api/v1-0/stageQuestions/{id}`.replace('{id}', id), data)

// 查询详情
export const stageQuestionsByIdGet = (id, data) => get(`${baseUrl}/fed-api/v1-0/stageQuestions/{id}`.replace('{id}', id), data)

