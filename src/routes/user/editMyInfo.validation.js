const Joi = require("joi");

module.exports = {
  updateUserDataSchema: Joi.object({
    firstName: Joi.string().empty("").max(50).optional(),
    lastName: Joi.string().empty("").max(50).optional()
  })
};
