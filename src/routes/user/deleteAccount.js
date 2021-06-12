const Router = require("express").Router;
const isLoggedIn = require("../middleware/isLoggedIn");
const { User, Post } = require("../../db/models/index");
const bcrypt = require("bcryptjs");
const ROUTE = "/user";

module.exports = Router({ mergeParams: true }).delete(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    const { password } = req.body;
    if (!password) return res.sendStatus(400);
    bcrypt.compare(password, req.user.password, async (err, result) => {
      console.log(result);
      if (err) throw err;
      if (result === true) {
        await Post.destroy({
          where: { authorId: req.user.id }
        });
        await User.destroy({
          where: { id: req.user.id }
        });
        req.logOut();
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    });
  }
);
