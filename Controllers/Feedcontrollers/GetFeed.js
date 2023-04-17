
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../Database/Database');

module.exports.GetFeed = async (req, res) => {
    const { username } = req.user
    try {
        const findFollowings = await db.Users.find({username}).toArray();

        if (!findFollowings[0].following) return res.status(200).json('You are not following anyone');

        const mappedFollowings = findFollowings[0].following.map(follower => follower);
        const findPosts = await db.Posts.find({username: {$in: mappedFollowings}}).toArray();
        return res.status(200).json({posts: findPosts, users:findFollowings[0]});
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    }

}