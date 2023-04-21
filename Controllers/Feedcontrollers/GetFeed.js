const { db } = require('../../Database/Database');

module.exports.GetFeed = async (req, res) => {
    const { username } = req.user
    try {
        const findFollowings = await db.Users.find({username}).toArray();

        if (findFollowings.length === 0) return res.status(404).json('User not found');

        if (!findFollowings[0].following) return res.status(200).json('You are not following anyone');

        const mappedFollowings = findFollowings[0].following.map(follower => follower);
        mappedFollowings.push(username);
        const findPosts = await db.Posts.find({username: {$in: mappedFollowings}}).sort({datePosted: -1}).toArray();
        return res.status(200).json(findPosts);
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    }

}