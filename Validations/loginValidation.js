const joi = require("joi")

const schema = joi.object({
    username: joi.string().min(3).max(36).required(),
    password: joi.string().min(6).max(30).required()
});

exports.loginValidation = (body) => {
    return schema.validate(body);
}