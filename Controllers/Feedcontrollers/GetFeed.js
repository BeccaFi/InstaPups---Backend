
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../Database/Database');

module.exports.GetFeed = async (req, res) => {
    try {
        const findPosts = await db.Posts.find().toArray();
        return res.status(200).send(findPosts);
    }
    catch (error) {
        return res.status(500).send('Something went wrong');
    }

}