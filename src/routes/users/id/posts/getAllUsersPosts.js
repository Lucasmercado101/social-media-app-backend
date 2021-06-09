const Router = require("express").Router;
const { User } = require("../../../../db/models/");

const ROUTE = "/users/:userId/posts";

module.exports = Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { userId } = req.params;
  //TODO: more/JOI validation and null checks
  if (!userId) return res.sendStatus(400);

  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ["password"] }
  });

  if (!user) return res.sendStatus(404);

  res.json(await user.getPosts());
});
