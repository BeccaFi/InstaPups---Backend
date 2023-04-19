const { db } = require ('../../Database/Database');

module.exports.NavAuth = async (req, res) => {

    const { username } = req.user;

    try {
        const findUser = await db.Users.find({username}).toArray();

        if (findUser.length === 0) return res.status(404).json('User not found');

        return res.status(200).json(findUser[0]);
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    }
}