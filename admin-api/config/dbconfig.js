module.exports = {
  DBConfig: {
    local: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    },
    test: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    },
    prod: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  },
  RedisConfig: {
    local: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: null,
        db: 0,
      }
    },
    test: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: null,
        db: 1,
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