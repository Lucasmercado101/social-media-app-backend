const Router = require("express").Router;

const ROUTE = "/auth/is-logged-in";

module.exports = Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  if (req.isAuthenticated()) return res.sendStatus(200);
  res.sendStatus(401);
});
