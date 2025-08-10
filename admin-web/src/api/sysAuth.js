// Authentication service

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 获取用户按钮权限 
export const permissionGet = (data) => get(`${baseUrl}/fed-api/users/permission`, data)


