//endereçar o .env
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", "..", ".env"),
});

//importar biblioteca pg
const { Pool } = require("pg");
const config = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
};

const pool = new Pool(config);

module.exports = pool;
