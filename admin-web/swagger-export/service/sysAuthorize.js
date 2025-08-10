// 用户相关

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 根据token获取用户权限
export const permissionGet = (token, data) => get(`${baseUrl}/fed-api/v1-0/sysAuthorize/permission/{token}`.replace('{token}', token), data)

// 根据token获取用户菜单
export const menuGet = (token, data) => get(`${baseUrl}/fed-api/v1-0/sysAuthorize/menu/{token}`.replace('{token}', token), data)

// 根据token获取用户系统
export const appGet = (token, data) => get(`${baseUrl}/fed-api/v1-0/sysAuthorize/app/{token}`.replace('{token}', token), data)

