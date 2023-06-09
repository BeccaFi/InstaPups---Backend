
const { db } = require('../../Database/Database');

module.exports.GetMembers = async (req, res) => {
    try {
        const findMembers = await db.Users.find().toArray();

        if (findMembers.length === 0) return res.status(404).json('No members found');
        const membersWithoutYou = findMembers.filter(member => member.username !== req.user.username);
        return res.status(200).json(membersWithoutYou);
    }
    catch (error) {
        return res.status(500).json('Something went wrong');
    }

}