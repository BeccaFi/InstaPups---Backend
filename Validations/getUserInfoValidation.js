const joi = require("joi")

const schema = joi.object({
    username: joi.string().required()
});

exports.getUserInfoValidation = (body) => {
    return schema.validate(body);
}



