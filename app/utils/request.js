const axios = require('axios')
const service = axios.create({
    timeout: 150000
})

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        return response.data
    },
    error => {
        console.info(error)
        const data = error.response.data
        const msg = (data && data.msg) || '网络错误'
        console.log('err' + msg) // for debug
        return Promise.reject(error)
    }
)

// 处理get请求
const get = (url, params, config = {}) => service.get(url, { ...config, params })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
const del = (url, params, config = {}) => service.delete(url, { ...config, params })
// 处理post请求
const post = (url, params, config = {}) => service.post(url, params, config)
// 处理put请求
const put = (url, params, config = {}) => service.put(url, params, config)
// 处理patch请求
const patch = (url, params, config = {}) => service.patch(url, params, config)

module.exports = {
    get,
    del,
    post,
    put,
    patch
}
