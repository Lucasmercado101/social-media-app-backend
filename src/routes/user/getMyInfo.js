const Router = require("express").Router;
const isLoggedIn = require("../middleware/isLoggedIn");
const { User, Post } = require("../../db/models/index");

const ROUTE = "/user";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const userData = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          as: "userPosts"
        },
        {
          model: User,
          as: "friendRequestsPending",
          attributes: ["id"],
          through: {
            attributes: []
          },
          joinTableAttributes: []
        },
        {
          model: User,
          as: "friends",
          attributes: ["id"],
          through: {
            attributes: []
          },
          joinTableAttributes: []
        },
        {
          model: User,
          as: "friendRequestsSent",
          attributes: ["id"],
          through: {
            attributes: []
          },
          joinTableAttributes: []
        }
      ]
    });
    delete userData.password;
    res.json(userData);
  }
);
