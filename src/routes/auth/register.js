const Router = require("express").Router;
const { User } = require("../../db/models/index");
const bcrypt = require("bcryptjs");

const ROUTE = "/auth/register";

module.exports = Router({ mergeParams: true }).post(ROUTE, async (req, res) => {
  const { username, password, ...otherProps } = req.body;

  const user = await User.findOne({ where: { username } });
  if (user) return res.sendStatus(409);

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    ...otherProps
  });
  res.json(newUser);
});
