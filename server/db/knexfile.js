// Update with your config settings.
"use strict"

const config = require('./config_local');

module.exports = {

  development: {
    client: 'pg',
    connection: config,
    pool: {
      min: 2,
      max: 100
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
