const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  autoRouter: {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-auto-router'),
  },
  swaggerLite:{
    enable: true,
    path: path.join(__dirname, '../plugin/egg-swagger-lite')
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};
