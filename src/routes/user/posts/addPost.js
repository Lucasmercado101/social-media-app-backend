const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");
const ROUTE = "/user/posts";

module.exports = Router({ mergeParams: true }).post(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    //TODO: validation
    req.body.content = req.body.content.trim();
    const newPost = await req.user.createPost(req.body);
    res.json(newPost);
  }
);
