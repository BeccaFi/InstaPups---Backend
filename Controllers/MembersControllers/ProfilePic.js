const { ObjectId } = require("mongodb");
const { db } = require("../../Database/Database");
const { picUrlValidation } = require("../../Validations/newProfilePicValidation");

exports.profilePic = async function profilePic (req, res) {

    const validation = picUrlValidation(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    const {username} = req.user;
    const {picUrl} = req.body;

    const result = await db.Users.updateOne({username: username}, {$set: {profilePic: picUrl}});

    try {
        if(error) return res.status(400).json(result);

        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json('There seems to be an issue with the server. Please try again later.');
    }

}