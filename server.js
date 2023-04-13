const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { db } = require("./Database/Database");
const { AuthenticationRoute } = require("./Routes/Authenticationroutes");
const { Feedroute } = require("./Routes/Feedroute");
const { checkAuthentication } = require("./Middlewares/Authentication");

db.connect();

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use("/auth", AuthenticationRoute);
server.use("/feed", checkAuthentication, Feedroute)


server.listen(5051);

exports.server = server;
