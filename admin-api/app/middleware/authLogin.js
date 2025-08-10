const constant = require('../constant/index')
const dayjs = require('dayjs')

const whiteUrls = ['/swagger', '/docs', '/fed-api/open', '/fed-api/v1-0/mkt', '/fed-api/v1-0/open', '/liui']
const code = constant.CODE
module.exports = (options, app) => {
  return async function(ctx, next) {
    // await next()
    // 如果ctx.url在白名单中
    // if(app.config.env !== 'prod') {
      let isWhiteUrl = whiteUrls.some((whiteUrl) => {return ctx.url.startsWith(whiteUrl) || ctx.url.endsWith(whiteUrl)})
      if (!isWhiteUrl) {
        const token = ctx.header['authentication'] 
        const platform = ctx.header['platform'] || ctx.header['Platform']

        if (!token) {
          ctx.body = {
            code: code.NOT_AUTH_CODE.code,
            msg: code.NOT_AUTH_CODE.msg
          }
        } else {
          let userInfo = await app.redis.get('ADMIN_' + token)

          const expectedPrefix = `/fed-api/app`
          if (ctx.url.startsWith(expectedPrefix)) {
            if (!platform) {
              ctx.body = {
                code: code.NOT_PLATFORM_CODE.code,
                msg: code.NOT_PLATFORM_CODE.msg
              }
              return
            } else {
              userInfo = await app.redis.get(`${platform.toUpperCase()}_` + token)
            }
          }
          
          if (userInfo) {
            userInfo = JSON.parse(userInfo)
            const request = ctx.request
            request.header.accountId = userInfo.id
            request.header.roleIds = userInfo.roleIds
            
            // 获取平台标识，如果是 app 平台则不延时（永久 token），其他平台需要延时
            if (platform !== 'app') {
              // 延时（仅对非 app 平台）
              app.redis.expire('ADMIN_' + token, 60 * 60)
            }
            
            await next()
          } else {
              ctx.body = {
              code: code.TOKEN_INVALID_CODE.code,
              msg: code.TOKEN_INVALID_CODE.msg
            }
            return
          }
        }
      } else {
        // 白名单
        await next()
      }
    // } else {
    //   const request = ctx.request
    //   request.header.accountId = '2942349846851354624'
    //   await next()
    // }
  }
}
