const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");
const { Post, User } = require("../../../db/models/index");

const ROUTE = "/user/explore";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const { count } = await Post.findAndCountAll();

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
            attributes: ["firstName", "lastName", "profilePictureURL"]
          }
        ]
      });
      res.json(results);
    } catch (e) {
      res.sendStatus(500);
    }
  }
);
