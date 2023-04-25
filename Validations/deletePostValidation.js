const joi = require("joi");

const schema = joi.object({
  id: joi.string().required(),
});

exports.deletePostValidation = (params) => {
  return schema.validate(params);
};
