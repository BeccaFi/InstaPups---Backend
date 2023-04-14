
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../Database/Database');

module.exports.GetFeed = async (req, res) => {

    const schema = joi.object({
        username: joi.string().required(),
    });

    const { validation, error } = schema.validate(req.query);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { username } = validation;

    try {
        const findPosts = await db.Posts.find({username}).toArray();
        return res.status(200).send(findPosts);
    }
    catch (error) {
        return res.status(500).send('Something went wrong');
    }

}