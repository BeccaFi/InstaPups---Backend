const joi = require("joi");
const schema = joi.object({
  text: joi.when("photos", { not: joi.exist(), then: joi.string().required(), otherwise: joi.string() }),
  photos: joi.array().items(joi.string()),
});

exports.updatePostValidation = (body) => {
  return schema.validate(body);
};
