const { db } = require('../../Database/Database');

module.exports.GetFollows = async (req, res) => {

    const { username } = req.user;

    try {
        const findFollowings = await db.Users.find({username}).toArray();

        if (findFollowings.length === 0) return res.status(404).json('User not found');
        
        return res.status(200).json(findFollowings[0].following);
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    }

}