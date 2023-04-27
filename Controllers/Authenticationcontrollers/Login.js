const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../../Database/Database");
const { loginValidation } = require("../../Validations/loginValidation");

module.exports.Login = async (req, res) => {
  const { error, value } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

    if(error) return res.status(400).send(error.details[0].message);

    const { username, password } = value;
    
    try {
    const findUser = await db.Users.findOne({ username });

    if (!findUser) return res.status(404).json('That user does not exist');

    const validPassword = await bcrypt.compare(password, findUser[0].password);

    if (!validPassword) return res.status(401).json("Wrong password");

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("authToken", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send(error);
  }
};
