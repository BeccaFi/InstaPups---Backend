
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../Database/Database');

module.exports.GetFeed = async (req, res) => {

    const schema = joi.object({
        username: joi.string().required(),
    });

    const { value, error } = schema.validate(req.query);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { username } = value;

    try {
        const findFollowings = await db.Users.find({username}).toArray();

        if (!findFollowings[0].following) return res.status(200).send('You are not following anyone');

        const mappedFollowings = findFollowings[0].following.map(follower => follower);
        console.log(mappedFollowings)
        const findPosts = await db.Posts.find({username: {$in: mappedFollowings}}).toArray();
        return res.status(200).send(findPosts);
    }
    catch (error) {
        return res.status(500).send('Something went wrong');
    }

}