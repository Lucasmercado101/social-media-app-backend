const Router = require("express").Router;
const { User } = require("../../../../db/models");
const Sequelize = require("sequelize");

const ROUTE = "/users/:userId/posts";

module.exports = Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { userId } = req.params;
  //TODO: more/JOI validation and null checks
  if (!userId) return res.sendStatus(400);

  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ["password"] }
  });

  if (!user) return res.sendStatus(404);

  const page = parseInt(req.query.page);
  if (page < 1) return res.sendStatus(400);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  const [{ count }] = await user.getPosts({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
    raw: true
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
    results.results = await user.getPosts({
      offset: startIndex,
      limit: limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "profilePictureURL"]
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
      ]
    });
    res.json(results);
  } catch (e) {
    res.sendStatus(500);
  }
});
