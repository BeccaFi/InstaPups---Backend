
const { db } = require('../../Database/Database');

module.exports.GetMembers = async (req, res) => {
    try {
        const findMembers = await db.Users.find().toArray();
        return res.status(200).json(findMembers);
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    }

}