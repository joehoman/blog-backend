const knex = require("knex");
const knexConfig =
  require("../knexfile")[process.env.NODE_ENV || "development"];

const dbConnection = knex(knexConfig);
module.exports dbConnection;