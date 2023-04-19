const joi = require("joi")

const schema = joi.object({
    id: joi.string().min(24).max(24).required()
});

exports.userProfileValidation = (params) => {
    return schema.validate(params);
}