// 上传服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl


// 文件上传
export const uploadPost = (data) => post(`${baseUrl}/fed-api/v1-0/upload`, data)

