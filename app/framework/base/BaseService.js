const { Service } = require('egg');
const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');

const flakeIdGen = new FlakeId({ epoch: 1000000000001 });
class IndexService extends Service {
  /**
     * 获取分页数据
     * @param tableName
     * @param pageNo
     * @param pageSize
     * @param whereObj
     * @param order
     * @return {Promise<{total: number, pageNo: number, pageSize: number}>}
     */
  async page (tableName, pageNo = 1, pageSize = 10, whereObj = {}, order = []) {
    const where = {};
    Object.keys(whereObj).map(item => {
      const value = whereObj[item];
      if ({}.toString.call(value) !== '[object Undefined]') {
        where[item] = value;
      }
    });
    const query = {
      offset: (pageNo * 1) * (pageSize * 1) - (pageSize * 1),
      limit: pageSize * 1,
      where,
    };

    const countResult = await this.app.model[tableName].findAndCountAll({ where });
    const defaultOrder = [['id', 'desc'], ['created_at', 'desc']];
    order = order.concat(defaultOrder);
    const results = await this.app.model[tableName].findAll({ ...query, order });
    const data = {
      total: countResult.count * 1,
      pageNo,
      pageSize: pageSize * 1,
    };
    data.records = results;
    return data;
  }

  /**
     * 获取所有数据
     * @param tableName
     * @param whereObj
     * @param order
     * @return {Bluebird<TInstance[] | *>}
     */
  async list (tableName, whereObj = {}, order = []) {
    const where = {};
    Object.keys(whereObj).map(item => {
      const value = whereObj[item];
      if ({}.toString.call(value) !== '[object Undefined]') {
        where[item] = value;
      }
    });
    const query = {
      where,
    };
    const defaultOrder = [['id', 'desc'], ['created_at', 'desc']];
    order = order.concat(defaultOrder);
    return await this.app.model[tableName].findAll({ ...query, order });
  }

  /**
     * 保存
     * @param tableName
     * @param data
     * @return {Promise<void>}
     */
  async save (tableName, data) {
    const id = intformat(flakeIdGen.next(), 'dec')
    data.id = id
    const { accountId } = this.ctx.request.header;
    data.createdBy = accountId;
    return await this.app.model[tableName].create(data);
  }

  /**
     * 修改
     * @param tableName
     * @param id
     * @param data
     * @return {Promise<void>}
     */
  async update (tableName, id, data) {
    const resData = await this.app.model[tableName].findByPk(id);
    if (!resData) return 0;
    const updateData = {};
    Object.keys(data).map(item => {
      const value = data[item];
      if (value !== null && value !== '' && value !== undefined) {
        updateData[item] = value;
      }
    });
    const { accountId } = this.ctx.request.header;
    updateData.updatedBy = accountId;
    return await resData.update(updateData);
  }

  /**
 * 删除
 * @param tableName
 * @param id
 * @return {Promise<number>}
 */
  async removeById (tableName, id) {
    const data = await this.app.model[tableName].findByPk(id);
    if (!data) {
      return 0;
    }
    const { accountId } = this.ctx.request.header;
    data.updatedBy = accountId;
    await data.destroy();
    return 1;

  }

  /**
     * 根据id获取对象
     * @param tableName 表名
     * @param id
     * @return {Bluebird<TInstance>}
     */
  async getById (tableName, id) {
    return await this.app.model[tableName].findByPk(id);
  }

  /**
   * 根据条件获取对象
   * @param tableName
   * @param whereObj
   * @return {Bluebird<TInstance>}
  */
  async getOne (tableName, whereObj = {}) {
    const where = {};
    Object.keys(whereObj).map(item => {
      const value = whereObj[item];
      if ({}.toString.call(value) !== '[object Undefined]') {
        where[item] = value;
      }
    });
    const query = {
      where,
    };
    return await this.app.model[tableName].findOne(query);
  }
}

module.exports = IndexService;
