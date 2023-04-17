const { ObjectId } = require('mongodb');
const { db } = require('../../Database/Database');

module.exports.GetMember = async (req, res) => {
    const id = req.params.id;
    const formattedId = id.substring(1);

    try {
        const findUserInformation = await db.Users.find({_id: new ObjectId(formattedId)}).toArray();

        if (findUserInformation.length === 0) {
            return res.status(404).json('User not found');
        }
        
        const findUsersPosts = await db.Posts.find({username: findUserInformation[0].username}).toArray();

        if (findUsersPosts.length === 0) {
            return res.status(404).json('User has no posts');
        }

        return res.status(200).json({user: findUserInformation[0], posts: findUsersPosts});
    } catch (error) {
        return res.status(500).json('Something went wrong');
    }
}
