const Router = require("express").Router;

const ROUTE = "/auth/login";

module.exports = Router({ mergeParams: true }).get(
	ROUTE,
	async (req, res, next) => {}
);
