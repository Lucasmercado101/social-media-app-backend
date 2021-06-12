require("dotenv").config();
const Sequelize = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/social`,
  {
    logging: false
  }
);

const User = require("./user")(db);
const Post = require("./post")(db);

// --- Relations ---

Post.belongsTo(User, { foreignKey: "authorId" });
User.hasMany(Post, { foreignKey: "authorId", as: "userPosts" });

Post.belongsToMany(User, { through: "PostLikes", as: "likes" });
User.belongsToMany(Post, { through: "PostLikes", as: "postsLiked" });

Post.belongsToMany(User, { through: "PostDislikes", as: "dislikes" });
User.belongsToMany(Post, { through: "PostDislikes", as: "postsDisliked" });

User.belongsToMany(User, { as: "friends", through: "userFriends" });

User.belongsToMany(User, {
  as: "friendRequestsPending",
  through: "userFriendRequestsPending"
});

User.belongsToMany(User, {
  as: "friendRequestsSent",
  through: "userFriendRequestsSent"
});

module.exports = { db, User, Post };
