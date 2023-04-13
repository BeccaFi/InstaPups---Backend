const joi = require("joi")
.extend(require('@joi/date'));

const schema = joi.object({
    datePosted: joi.date().format('YYYY-MM-DD HH:mm').required(),
    text: joi.when('photos', { not: joi.exist(), then: joi.string().required(), otherwise: joi.string() }),
    photos: joi.array()
});

exports.createPostValidation = (body) => {
    return schema.validate(body);
}