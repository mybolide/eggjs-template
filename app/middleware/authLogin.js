const constant = require('../constant/index');
const dayjs = require('dayjs');
// const userSeed = require('../model/userSeed');

const whiteUrls = [
  '/swagger',
  '/fed-api/v1-0/login',
  '/fed-api/v1-0/open',
  '/certification',
  '/open'
];
const code = constant.CODE;
const whiteSec = 'U2FsdGVkX1yeB13bULek3umdMKCQsvJxxoNxw1uqiTQiwxVaoFVmNQsIYSJWmYvs+v8oczn5A=';
module.exports = (options, app) => {
  console.info('app.config.env=>', app.config.env)
  const isChecked = true
  return async function testMiddleware (ctx, next) {
    // 如果ctx.url在白名单中
    const token = ctx.header['x-token'];
    if (token === whiteSec) {
      await next();
    } else if (isChecked) {
      const isWhiteUrl = whiteUrls.some(whiteUrl => { return ctx.url.startsWith(whiteUrl) || ctx.url.endsWith(whiteUrl); });
      if (!isWhiteUrl) {
        if (!token) {
          ctx.body = {
            code: code.NOT_AUTH_CODE.code,
            msg: code.NOT_AUTH_CODE.msg
          }
          // userToken.update({ status: 'EXPIRES_INVALID',  expiresTime: dayjs()})
        } else {
          // await app.redis.del(`USER_LOGIN_${token}`)
          let userInfo = await app.redis.get(`USER_LOGIN_${token}`)
          if (userInfo === null) {
            const userLogin = await ctx.service.loginLogsService.getOne('LoginLogs', { token, status: 'NORMAL' })
            if (userLogin === null) {
              ctx.body = {
                code: code.TOKEN_INVALID_CODE.code,
                msg: code.TOKEN_INVALID_CODE.msg
              }
              return
            }
            userInfo = await ctx.service.accountService.getById('Account', userLogin.userId)
            if (userInfo) {
              userInfo = JSON.stringify(userInfo)
              // userToken.update({ status: 'EXPIRES_INVALID', expiresTime: dayjs() })
              ctx.body = {
                code: code.TOKEN_INVALID_CODE.code,
                msg: code.TOKEN_INVALID_CODE.msg
              }
            } else {
              ctx.body = {
                code: code.TOKEN_UNKONOW_CODE.code,
                msg: code.TOKEN_UNKONOW_CODE.msg
              }
            }
          }
          userInfo = JSON.parse(userInfo)
          const request = ctx.request
          request.header.accountId = userInfo.id
          // app.redis.expire(`USER_LOGIN_${token}`, 60 * 60 * 2)
          // app.redis.expire(`USER_LOGIN_${userInfo.id}`, 60 * 60 * 2)
          await next()
        }
      } else {
        // 白名单
        await next()
      }
    } else {
      await next()
    }
  }
}
