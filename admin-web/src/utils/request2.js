import axios from 'axios'
// import { parse } from './response'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'
const service = axios.create({
//   baseURL: 'http://127.0.0.1:10883',
  timeout: 150000
})

window.axiosCancel = []

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['authentication'] = getToken()
    }
    config.cancelToken = new axios.CancelToken(cancel => {
      window.axiosCancel.push({
        cancel
      })
    })
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    
    if (response.request.responseType === 'arraybuffer') {
      return response.data
    } else {
      const res = response.data
      if (res.code !== 1) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
        // parse(res.code)
        if (res.code === 401 || res.code === 200101 || res.code === 200102 || res.code === 200103 || res.code === 240420) {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
        return Promise.reject(response.data)
      } else {
        return response.data
      }
    }
  },
  (error) => {
    const data = error.response ? error.response.data : null
    let msg = (data && data.msg) || 'Network error'
    Message({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
    if (data) {
      parse(data.code)
    }
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 处理get请求
export const get = (url, params, config = {}) => service.get(url, { ...config, params })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
export const deletes = (url, params, config = {}) => service.delete(url, { ...config, params })
// 处理post请求
export const post = (url, params, config = {}) => service.post(url, params, config)
// 处理put请求
export const put = (url, params, config = {}) => service.put(url, params, config)
// 处理patch请求
export const patch = (url, params, config = {}) => service.patch(url, params, config)

export default {
  get,
  deletes,
  post,
  put,
  patch
}
