const { db } = require('../../Database/Database');
const { followMemberValidation } = require('../../Validations/followMemberValidation');

module.exports.FollowMember = async (req, res) => {

    

    const { value, error } = followMemberValidation(req.body);

    const followMember = value.username;
    const { username } = req.user;
    
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    if (username === followMember) {
        return res.status(400).json('You cannot follow yourself');
    }

    try {

        const findUser = await db.Users.find({username}).toArray();

        if (findUser.length === 0) return res.status(404).json('User not found');
        
        if (findUser[0].following.includes(followMember)) {
            const unfollowings = db.Users.updateOne({username}, {$pull: {following: followMember}})
            return res.status(200).json("unfollowed");
        }
        const followings = db.Users.updateOne({username}, {$push: {following: followMember}})
        
        return res.status(200).json("followed");
    }

    catch (error) {
        return res.status(500).json('Something went wrong with the database');
    }
}