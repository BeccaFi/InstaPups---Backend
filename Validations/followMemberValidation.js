const joi = require("joi")

const schema = joi.object({
    username: joi.string().required(),
});

exports.followMemberValidation = (body) => {
    return schema.validate(body);
}