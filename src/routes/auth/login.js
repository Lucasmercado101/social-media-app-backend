const Router = require("express").Router;
const passport = require("passport");
const ROUTE = "/auth/login";

module.exports = Router({ mergeParams: true }).post(ROUTE, (req, res, next) =>
  passport.authenticate("local", function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);

    req.login(user, function (err) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
    });
  })(req, res, next)
);
