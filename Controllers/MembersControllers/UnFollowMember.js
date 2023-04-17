const { db } = require('../../Database/Database');
const joi = require('joi');

module.exports.UnFollowMember = async (req, res) => {

    const schema = joi.object({
        username: joi.string().required(),
    });

    const { value, error } = schema.validate(req.body);

    const unfollowMember = value.username;
    const { username } = req.user;
    
    if (error) {
        return res.status(400).json('Invalid username');
    }

    try {
        const unfollowings = db.Users.updateOne({username}, {$pull: {following: unfollowMember}})
        
        return res.status(200).json("You are now unfollowing " + unfollowMember);
    }

    catch (error) {
        return res.status(500).json('Something went wrong with the database');
    }
}