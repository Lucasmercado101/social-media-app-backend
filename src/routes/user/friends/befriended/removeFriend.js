const Router = require("express").Router;
const isLoggedIn = require("../../../middleware/isLoggedIn");
const { User } = require("../../../../db/models/index");

const ROUTE = "/user/friends/befriended/:userId";

module.exports = Router({ mergeParams: true }).delete(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.sendStatus(400);
    const toUser = await User.findByPk(userId);
    if (!toUser) return res.sendStatus(404);
    await req.user.removeFriend(toUser.id);
    await toUser.removeFriend(req.user.id);
    res.sendStatus(200);
  }
);
