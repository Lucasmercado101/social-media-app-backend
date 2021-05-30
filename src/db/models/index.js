require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/social`,
  {
    logging: false
  }
); //logging false would prevent outputting SQL to the console on execution. Log true to see what you get!

const User = require("./user")(db);
const Post = require("./user")(db);

module.exports = db;
