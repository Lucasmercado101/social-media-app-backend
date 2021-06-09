const Router = require("express").Router;
const { User } = require("../../../db/models/");

const ROUTE = "/users/:userId";

module.exports = Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.sendStatus(400);

  res.json(
    await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] }
    })
  );
});
