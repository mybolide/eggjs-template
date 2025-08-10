module.exports = {
  CODE: {
    // 登录失效
    TOKEN_INVALID_CODE: {
      code: 240420,
      msg: 'Token expired or invalid'
    },
    // 用户未认证
    NOT_AUTH_CODE: {
      code: 240415,
      msg: 'User not authenticated'
    },
    // header缺少平台标识
    NOT_PLATFORM_CODE: {
      code: 240416,
      msg: 'Missing platform identifier in header'
    }
  }
}