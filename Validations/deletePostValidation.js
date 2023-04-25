const joi = require("joi");

const schema = joi.object({
  id: joi.string().required(),
});

exports.deletePostValidation = (id) => {
  return schema.validate(id);
};
