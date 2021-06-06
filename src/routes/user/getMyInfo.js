const Router = require("express").Router;
const isLoggedIn = require("../middleware/isLoggedIn");

const ROUTE = "/user";

module.exports = Router({ mergeParams: true }).get(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const userData = req.user.toJSON();
    delete userData.password;
    res.json(userData);
  }
);
