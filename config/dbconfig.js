module.exports = {
  DBConfig: {
    test: {
      host: '*',
      port: '3306',
      user: 'root',
      password: '*',
      database: '*'
    },
    prod: {
      host: '*',
      port: '3306',
      user: 'root',
      password: '*',
      database: '*'
    }
  },
  RedisConfig: {
    test: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: null,
        db: 0,
      }
    },
    prod: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: null,
        db: 0,
      }
    }
  }

}
