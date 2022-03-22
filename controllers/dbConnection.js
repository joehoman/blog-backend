require("dotenv").config();
const knex = require("knex");
const knexConfigs = require("../knexfile.js");
const currentConfig = knexConfigs["development"];
const dbConnection = knex(currentConfig);
module.exports = dbConnection;