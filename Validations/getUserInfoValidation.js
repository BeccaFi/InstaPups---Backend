const joi = require("joi")

const schema = joi.object({
    postUsername: joi.string().required()
});

exports.getUserInfoValidation = (query) => {
    return schema.validate(query);
}



