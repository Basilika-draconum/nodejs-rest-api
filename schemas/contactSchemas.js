const Joi = require("joi");

const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
});

module.exports = { schemaAdd };
