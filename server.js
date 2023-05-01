const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { db } = require("./Database/Database");

const { AuthenticationRoute } = require("./Routes/Authenticationroutes");
const { Membersroute } = require("./Routes/Membersroute");
const { Feedroute } = require("./Routes/Feedroute");
const { PostRoutes } = require("./Routes/PostRoutes");

db.connect();

server.use(
  cors({
    origin: "https://instapups.onrender.com",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());
server.use("/auth", AuthenticationRoute);
server.use("/feed", Feedroute);
server.use("/posts", PostRoutes);
server.use("/members", Membersroute);

server.get('/ping', (req, res) => res.sendStatus(200));

exports.server = server;
