const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");
const { User } = require("../../../db/models/index");

const ROUTE = "/user/friends";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) =>
    res.json(
      await User.findByPk(req.user.id, {
        attributes: ["id"],
        include: [
          {
            model: User,
            as: "friendRequestsPending",
            attributes: ["id", "profilePictureURL", "firstName", "lastName"],
            through: {
              attributes: []
            },
            joinTableAttributes: []
          },
          {
            model: User,
            as: "friends",
            attributes: ["id", "profilePictureURL", "firstName", "lastName"],
            through: {
              attributes: []
            },
            joinTableAttributes: []
          },
          {
            model: User,
            as: "friendRequestsSent",
            attributes: ["id", "profilePictureURL", "firstName", "lastName"],
            through: {
              attributes: []
            },
            joinTableAttributes: []
          }
        ]
      })
    )
);
