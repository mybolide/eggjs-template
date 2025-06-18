const { Service } = require("egg");
const FlakeId = require("flake-idgen");
const intformat = require("biguint-format");

const flakeIdGen = new FlakeId({ epoch: 1000000000001 });
class IndexService extends Service {
  /**
   * 执行带分页查询的 SQL 查询
   * @param {string} sql - 要执行的 SQL 查询语句
   * @param {number} pageNo - 查询的页数
   * @param {number} pageSize - 每页的数据条数
   * @returns {Object|null} 包含分页查询结果和总记录数的对象；如果查询出错，则返回 null
   */
  async queryWithPagination(sql, pageNo = 1, pageSize = 10, replacements = []) {
    const offset = (pageNo - 1) * pageSize;
    const querySql = `${sql} LIMIT ${pageSize} OFFSET ${offset}`;

    try {
      const result = await this.executeRawSQL(querySql, replacements);
      const countSql = `SELECT COUNT(*) as count FROM (${sql}) AS count_table`;
      // const regex = /SELECT\s+.*?\s+FROM\s+(.*?)\s+WHERE\s+(.*?)\s+ORDER\s+BY\s+.*?$/;
      // const countSql = sql.replace(/\n/g, " ").replace(regex, "SELECT COUNT(*) FROM $1 WHERE $2");

      const countResult = await this.executeRawSQL(countSql, replacements);
      const total = countResult[0].count * 1;

      const data = {
        total,
        pageNum: pageNo,
        pageSize: pageSize * 1,
        records: result,
      };

      return data;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  /**
   * 执行sql语句
   * @param {string} sql
   * @returns
   */
  executeRawSQL(sql, replacements = []) {
    // return this.app.model.query(sql, { type: this.app.Sequelize.QueryTypes.SELECT })
    try {
      let type = this.app.Sequelize.QueryTypes.SELECT;
      if (sql.toLocaleUpperCase().indexOf("UPDATE") > -1) {
        type = this.app.Sequelize.QueryTypes.UPDATE;
      }
      const results = this.app.model.query(sql, { type, replacements });
      // 将下划线分隔的字段名转换为驼峰命名
      const camelCaseResults = results.map((row) => {
        const camelCaseRow = {};
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (match, group) => group.toUpperCase());
            camelCaseRow[camelCaseKey] = row[key];
          }
        }
        return camelCaseRow;
      });

      return camelCaseResults;
    } catch (error) {
      console.error("Error executing raw SQL query:", error);
      throw error; // 可以选择抛出错误供调用者处理
    }
  }
  /**
   * 获取分页数据
   * @param tableName
   * @param pageNo
   * @param pageSize
   * @param where
   * @returns {Promise<{total: number, pageNo: number, pageSize: number}>}
   */
  async page(tableName, pageNo = 1, pageSize = 10, whereObj = {}, order = [], include = []) {
    const where = {};
    if (!this.ctx.request.header.open) {
      const roleIds = this.ctx.request.header.roleIds
      if (roleIds.indexOf('2952063671720738816') === -1 && !whereObj.tenantCode) {
        whereObj.tenantCode = this.ctx.request.header.tenantCode
      }
    }
    Object.keys(whereObj).map((item) => {
      const value = whereObj[item];
      if ({}.toString.call(value) !== "[object Undefined]" && value != '') {
        where[item] = value;
      }
    });
    where.isDeleted = (where && where.isDeleted !== undefined) ? where.isDeleted : 0
    const query = {
      offset: pageNo * 1 * (pageSize * 1) - pageSize * 1,
      limit: pageSize * 1,
      where,
    };

    // const countResult = await this.app.model[tableName].findAndCountAll({ where, include })
    const defaultOrder = [
      ["id", "desc"],
      ["created_at", "desc"],
    ];
    order = order.concat(defaultOrder);
    
    const results = await this.app.model[tableName].findAndCountAll({ ...query, order, include, attributes: { exclude: ['isDeleted'] }, paranoid: false });
    let data = {
      total: results.count * 1,
      pageNum: pageNo,
      pageSize: pageSize * 1,
      records: results.rows,
    };
    return data;
  }

  /**
   * 获取所有数据
   * @param tableName
   * @param where
   * @returns {Bluebird<TInstance[] | *>}
   */
  async list(tableName, whereObj = {}, order = []) {
    const where = {};
    if (!this.ctx.request.header.open) {
      const roleIds = this.ctx.request.header.roleIds || []
      if (roleIds.indexOf('2952063671720738816') === -1 && !whereObj.tenantCode) {
        whereObj.tenantCode = this.ctx.request.header.tenantCode
      }
    }
    
    Object.keys(whereObj).map((item) => {
      const value = whereObj[item];
      if ({}.toString.call(value) !== "[object Undefined]") {
        where[item] = value;
      }
    });
    const query = {
      where,
    };
    const defaultOrder = [
      ["id", "desc"],
      ["created_at", "desc"],
    ];
    order = order.concat(defaultOrder);
    return await this.app.model[tableName].findAll({ ...query, order });
  }

  /**
   * 保存
   * @param tableName
   * @param data
   * @returns {Promise<void>}
   */
  async save(tableName, data) {
    const id = intformat(flakeIdGen.next(), "dec");
    data.id = id;
    const { accountId, tenantCode } = this.ctx.request.header;
    data.createdBy = accountId;
    data.tenantCode = tenantCode
    return await this.app.model[tableName].create(data);
  }

  /**
   * 修改
   * @param tableName
   * @param id
   * @param data
   * @returns {Promise<void>}
   */
  async update(tableName, id, data) {
    const resData = await this.app.model[tableName].findByPk(id);
    if (!resData) return 0;
    const updateData = {};
    const { accountId } = this.ctx.request.header;
    Object.keys(data).map((item) => {
      const value = data[item];
      if (value !== null && value !== "" && value !== undefined) {
        updateData[item] = value;
      }
    });
    updateData.updatedBy = accountId;
    await resData.update(updateData);
    return 1;
  }

  /**
   * 删除
   * @param tableName
   * @param id
   * @returns {Promise<number>}
   */
  async removeById(tableName, id) {
    const data = await this.app.model[tableName].findByPk(id);
    if (!data) {
      return 0;
    } else {
      const { accountId } = this.ctx.request.header;
      data.updatedBy = accountId;
      await data.destroy();
      return 1;
    }
  }

  /**
   * 根据id获取对象
   * @param tableName
   * @param id
   * @returns {Bluebird<TInstance>}
   */
  async getById(tableName, id) {
    return await this.app.model[tableName].findByPk(id);
  }

  /**
   * 根据条件获取对象
   * @param tableName
   * @param id
   * @returns {Bluebird<TInstance>}
   */
  async getOne(tableName, whereObj = {}) {
    const where = {};
    Object.keys(whereObj).map((item) => {
      const value = whereObj[item];
      if ({}.toString.call(value) !== "[object Undefined]") {
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
