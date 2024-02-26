// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: "QBot",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export default config;
