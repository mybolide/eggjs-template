// 认证服务

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 登录
export const loginPost = (data) => post(`${baseUrl}/fed-api/open/login`, data)

// 获取用户权限
export const powersGet = (data) => get(`${baseUrl}/fed-api/users/powers`, data)

// 获取用户权限
export const permissionGet = (data) => get(`${baseUrl}/fed-api/users/permission`, data)

// 退出
export const logoutGet = (token, data) => get(`${baseUrl}/fed-api/open/logout`.replace('{token}', token), data)

