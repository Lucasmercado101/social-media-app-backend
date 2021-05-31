const Router = require("express").Router;
const isLoggedIn = require("../../middleware/isLoggedIn");

const ROUTE = "/user/friends";

module.exports = Router({ mergeParams: true }).post(
  ROUTE,
  isLoggedIn,
  async (req, res) => res.json(await req.user.createFriend(req.body.userId))
);
