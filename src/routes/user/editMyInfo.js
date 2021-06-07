const Router = require("express").Router;
const isLoggedIn = require("../middleware/isLoggedIn");
const Joi = require("joi");
const { updateUserDataSchema } = require("./editMyInfo.validation");
const ROUTE = "/user";

module.exports = Router({ mergeParams: true }).put(
  ROUTE,
  isLoggedIn,
  async (req, res) => {
    let updateUserData;
    try {
      updateUserData = Joi.attempt(req.body, updateUserDataSchema);
    } catch (e) {
      if (e.isJoi) return res.status(400).send(e.message);
      return res.sendStatus(500);
    }

    for (let [key] of Object.entries(req.user.toJSON())) {
      if (updateUserData[key]) {
        req.user[key] = updateUserData[key];
      }
    }
    await req.user.save();
    res.sendStatus(200);
  }
);
