const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { db } = require("./Database/Database");
const { AuthenticationRoute } = require("./Routes/Authenticationroutes");

db.connect();
server.use(express.json());
server.use("/auth", AuthenticationRoute);

server.post("/test", async (req, res) => {
  const { username, age, school } = req.body;
  console.log(req.body);

  const result = await db.Comments.insertOne({ username: username, age: age, school: school });

  res.status(200).json(result);
});

server.listen(5051);

exports.server = server;
