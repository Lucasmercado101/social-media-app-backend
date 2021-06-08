const Router = require("express").Router;

const ROUTE = "/auth/logout";

module.exports = Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  await req.logOut();
  res.sendStatus(200);
});
