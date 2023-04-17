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
    if (username === followMember) {
        return res.status(400).json('You cannot follow yourself');
    }

    try {

        const findUser = await db.Users.find({username}).toArray();
        if (findUser[0].following.includes(followMember)) {
            const unfollowings = db.Users.updateOne({username}, {$pull: {following: unfollowMember}})
            return res.status(200).json("unfollowed");
        }
        const followings = db.Users.updateOne({username}, {$push: {following: followMember}})
        
        return res.status(200).json("followed");
    }

    catch (error) {
        return res.status(500).json('Something went wrong with the database');
    }
}