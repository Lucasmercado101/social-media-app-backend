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
const Post = require("./post")(db);

// --- Relations ---

Post.belongsTo(User, { foreignKey: "authorId" });
User.hasMany(Post, { foreignKey: "authorId" });

User.belongsToMany(User, { as: "friends", through: "userFriends" });

module.exports = { db, User, Post };
