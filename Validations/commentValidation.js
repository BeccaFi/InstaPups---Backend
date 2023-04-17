const joi = require("joi")

const schema = joi.object({
    id: joi.string().min(24).max(24).required(),
    comment: joi.string().min(1).required()
});

exports.commentPostValidation = (body) => {
    return schema.validate(body);
}