// Update with your config settings.
require("dotenv").config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

let connectionString = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {connectionString, ssl: {rejectUnauthorized:false}},
    }
  },
