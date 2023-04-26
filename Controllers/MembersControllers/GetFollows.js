const { db } = require('../../Database/Database');

module.exports.GetFollows = async (req, res) => {

    const { username } = req.user;

    try {
        const findFollowings = await db.Users.findOne({username});

        if (!findFollowings) return res.status(404).json('User not found');
        
        return res.status(200).json(findFollowings.following);
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    };

}