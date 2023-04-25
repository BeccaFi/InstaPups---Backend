const { db } = require("../../Database/Database");
const { getUserInfoValidation } = require("../../Validations/getUserInfoValidation");


module.exports.GetUserInfo = async (req, res) => {
    

    const {value, error } = getUserInfoValidation(req.query);

    const {postUsername} = value;
    const {username} = req.user;

    if (error) {
        return res.status(400).json('Invalid username');
    }

    try {
    const Userinfo = await db.Users.find({username: postUsername}).toArray();

    if (Userinfo.length === 0) return res.status(404).json('User not found');

    return res.status(200).json({loggedInUser: username, postUser: Userinfo[0]});
    }

    catch (error) {
        return res.status(500).json('Something went wrong with the database');
    }
}


    