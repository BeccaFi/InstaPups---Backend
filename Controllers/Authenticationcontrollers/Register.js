const joi = require("joi")
const { registerValidation } = require("../../Validations/registerValidation")
const bcrypt = require('bcrypt');
const { db } = require("../../Database/Database");


module.exports.Register = async (req, res) => {

    const validation = registerValidation(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.Users.insertOne({username: username, password: hashedPassword})
    .then(result => {
        return res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        if(err.code === 11000) return res.status(500).json("That username is already taken.");
        return res.status(500).send(err);
    })
}