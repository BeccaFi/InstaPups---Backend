const joi = require("joi")

const schema = joi.object({
    picUrl: joi.string().required()
});

exports.picUrlValidation = (body) => {
    return schema.validate(body);
}