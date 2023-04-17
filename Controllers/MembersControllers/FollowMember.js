const { db } = require('../../Database/Database');
const joi = require('joi');

module.exports.FollowMember = async (req, res) => {

    const schema = joi.object({
        username: joi.string().required(),
    });

    const { value, error } = schema.validate(req.body);

    const followMember = value.username;
    const { username } = req.user;
    
    if (error) {
        return res.status(400).json('Invalid username');
    }

    try {
        const followings = db.Users.updateOne({username}, {$push: {following: followMember}})
        
        return res.status(200).json("You are now following " + followMember);
    }

    catch (error) {
        return res.status(500).json('Something went wrong with the database');
    }
}