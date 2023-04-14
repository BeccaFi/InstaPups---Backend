const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { db } = require("./Database/Database");
const { AuthenticationRoute } = require("./Routes/Authenticationroutes");
const { PostRoutes } = require("./Routes/PostRoutes");

db.connect();

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use("/auth", AuthenticationRoute);
server.use("/posts", PostRoutes);

exports.server = server;
