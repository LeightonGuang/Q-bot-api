import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    charset: "utf8",
  },
  // migrations: {
  //   tableName: "knex_migrations",
  // },
};

module.exports = config;
