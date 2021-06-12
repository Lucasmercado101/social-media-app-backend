const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");
const { Post, User } = require("../../../db/models/index");
const { Op } = require("sequelize");

const ROUTE = "/user/feed";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const friendsIds = await req.user
      .getFriends({
        attributes: ["id"],
        through: {
          attributes: []
        },
        joinTableAttributes: []
      })
      .then((resp = []) => resp.map((friend) => friend.id));

    const idsToCheck = [...friendsIds, req.user.id];

    const { count } = await Post.findAndCountAll({
      include: [
        {
          model: User,
          where: {
            id: { [Op.in]: idsToCheck }
          }
        }
      ]
    });

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0 && startIndex < count) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    try {
      results.results = await Post.findAll({
        offset: startIndex,
        limit: limit,
        include: [
          {
            model: User,
            attributes: ["firstName", "lastName", "profilePictureURL", "id"],
            where: {
              id: { [Op.in]: idsToCheck }
            }
          },
          {
            model: User,
            as: "likes",
            attributes: ["id"],
            through: {
              attributes: []
            },
            distinct: true
          },
          {
            model: User,
            as: "dislikes",
            attributes: ["id"],
            through: {
              attributes: []
            }
          }
        ],
        order: [["createdAt", "DESC"]]
      });
      res.json(results);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);
