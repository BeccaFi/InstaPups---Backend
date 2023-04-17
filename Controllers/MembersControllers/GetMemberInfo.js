const { db } = require("../../Database/Database");
const joi = require("joi");


module.exports.GetMemberInfo = async (req, res) => {
    
    const schema = joi.object({
        username: joi.string().required()
    });

    const {value, error } = schema.validate(req.query);

    const {username} = value;

    if (error) {
        return res.status(400).json('Invalid username');
    }

    try {
    const Userinfo = await db.Users.find({username}).toArray();

    res.status(200).json(Userinfo[0]);
    }

    catch (error) {
        return res.status(500).json('Something went wrong with the database');
    }
}


    