import request from '@/utils/request'

export function login(userName, password) {
  return request({
    url: '/fed-api/open/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/account',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/fed-api/open/logout',
    method: 'get'
  })
}


