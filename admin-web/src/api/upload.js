// 上传服务控制器

import config from '../config/index'
import { post, get, deletes, put, patch } from '../utils/request2'
const baseUrl = config.baseUrl

// 获取文件路径
export const fileViewUrl = `${baseUrl}/fed-api/v1-0/open/file/url`

// 文件上传 
export const uploadPost = (data) => post(`${baseUrl}/fed-api/v1-0/upload`, data)

// 自定义文件上传 
export const customPost = (data) => post(`${baseUrl}/fed-api/v1-0/upload/custom`, data)

export const uploadFilePath = `${baseUrl}/fed-api/v1-0/upload`
export const uploadFilePathByUrl = `${baseUrl}/fed-api/v1-0/upload/url`
export const uploadWangEditorUrl = `${baseUrl}/fed-api/v1-0/uploadWangEditor`


// 下载文件 
export const FileDownLoadPost = (data) => get(`${baseUrl}/fed-api/v1-0/upload/bd/FileDownLoad`, data)

