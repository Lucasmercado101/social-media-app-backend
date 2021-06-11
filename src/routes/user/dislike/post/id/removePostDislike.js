const Router = require("express").Router;
const { Post } = require("../../../../../db/models/index");
const isLoggedIn = require("../../../../middleware/isLoggedIn");
const ROUTE = "/user/dislike/post/:postId";

module.exports = Router({ mergeParams: true }).delete(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) return res.sendStatus(404);
    await post.removeDislike(req.user.id);
    await post.removeLike(req.user.id);
    res.sendStatus(200);
  }
);
