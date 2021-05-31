const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");

const ROUTE = "/user/posts";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => res.json(await req.user.getPosts())
);
