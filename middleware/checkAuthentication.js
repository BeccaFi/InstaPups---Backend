const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  const authToken = req.cookies.authToken;
  // const token = authHeader && authHeader.split(" ")[1];

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticateUser };
