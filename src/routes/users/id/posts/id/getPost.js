const Router = require("express").Router;
const { Post, User } = require("../../../../../db/models/index");
const isLoggedIn = require("../../../../middleware/isLoggedIn");

const ROUTE = "/users/posts/:postId";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
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
    if (!post) return res.sendStatus(404);
    res.json(post);
  }
);
