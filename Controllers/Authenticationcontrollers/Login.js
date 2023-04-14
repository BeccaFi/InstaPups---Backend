
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../../Database/Database');

module.exports.Login = async (req, res) => {

    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
        password: joi.string().min(6).max(30).required()
    });

    const {error, value} = schema.validate(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const { username, password } = value;
    try {
    const findUser = await db.Users.find({username}).toArray();

    const validPassword = await bcrypt.compare(password, findUser[0].password);

    if(!validPassword) return res.status(401).json('Incorrect login credentials');

        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.cookie('authToken', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: true
          })

        return res.status(200).send({token});
    }
    catch (error) {
        return res.status(500).send(error);
    }
}