import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'


// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.MODE === 'development' ?  'http://127.0.0.1:10882' : 'https://fz-api.586213.xyz', // api 的 base_url
  timeout: 150000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // let account = localStorage['authentication'] || {}
      // if (account) {
      //   account = JSON.parse(account)
      // }
      config.headers['authentication'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
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
    /**
     * code 0 业务处理成功
     */
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 401 || res.code === 200101 || res.code === 200102 || res.code === 200103 || res.code === 240420) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
