const BaseService = require('../framework/BaseService')
const dayjs = require('dayjs')

/**
 * @service 三方token表服务类
 */
class IndexService extends BaseService {
    async findByKey(key) {
        const where = {
            appKey: key,
            expiresTime: {$gt: dayjs().format('YYYY-MM-DDTHH:mm:ss')}
        }
        console.info(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
        return  await this.ctx.model['SysOtherToken'].findOne({ where })
    }
}

module.exports = IndexService