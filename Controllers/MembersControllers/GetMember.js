const { ObjectId } = require('mongodb');
const { db } = require('../../Database/Database');
const { userProfileValidation } = require('../../Validations/userProfileValidation');

module.exports.GetMember = async (req, res) => {

    const validation = userProfileValidation(req.params);
    if (validation.error) return res.status(400).json(validation.error.details[0].message);

    const {username} = req.user;
    const {id} = req.params;

    const loggedInUser = await db.Users.findOne({username: username}, {projection: {password: 0}});
    const follows = loggedInUser.following;
    const findUser = await db.Users.findOne({_id: new ObjectId(id)}, {projection: {password: 0}});
    const findUserUsername = findUser.username; //To get the username of whoevers' profile we're viewing, not our own username from req.user.


    try {

        if (findUser.length === 0) return res.status(404).json('User not found');

        if(id === loggedInUser._id.toString()) {
            const userPosts = await db.Posts.find({username: username}).sort({datePosted: -1}).toArray();
            return res.status(200).json({user: loggedInUser, loggedInUser: loggedInUser, posts: userPosts});
        }

        if(follows.includes(findUserUsername)) {
            const userPosts = await db.Posts.find({username: findUserUsername}).sort({datePosted: -1}).toArray();
            if (userPosts.length === 0) return res.status(200).json({user: findUser, loggedInUser: loggedInUser, posts: userPosts, postMessage: `${findUserUsername} has no posts`});
            return res.status(200).json({user: findUser, loggedInUser: loggedInUser, posts: userPosts});
        }

        const userPosts = await db.Posts.find({username: findUserUsername}).sort({datePosted: -1}).toArray();
        res.status(200).json({user: findUser, loggedInUser: loggedInUser, posts: userPosts, followMessage: `You need to follow ${findUserUsername} to see their posts.`});
        return;
        // const findUsersPosts = await db.Posts.find({username: findUserInformation.username}).toArray();

        // return res.status(200).json({user: findUserInformation[0], posts: findUsersPosts});
    } catch (error) {
        return res.status(500).json('Something went wrong');
    }
}
