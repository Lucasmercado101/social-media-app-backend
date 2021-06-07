const Router = require("express").Router;
const isLoggedIn = require("../middleware/isLoggedIn");

const ROUTE = "/user";

module.exports = Router({ mergeParams: true }).put(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    for (let [key] of Object.entries(req.user.toJSON())) {
      if (req.body[key]) {
        req.user[key] = req.body[key];
      }
    }
    await req.user.save();
    res.sendStatus(200);
  }
);
