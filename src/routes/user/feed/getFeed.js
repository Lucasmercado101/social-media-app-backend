const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");

const ROUTE = "/user/feed";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    // res.json(await req.user.getPosts());
    res.sendStatus(200);
  }
);
