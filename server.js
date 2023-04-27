const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { db } = require("./Database/Database");

const { AuthenticationRoute } = require("./Routes/AuthenticationRoute");
const { MembersRoute } = require("./Routes/MembersRoute");
const { FeedRoute } = require("./Routes/FeedRoute");
const { PostRoute } = require("./Routes/PostRoute");

db.connect();

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());
server.use("/auth", AuthenticationRoute);
server.use("/feed", FeedRoute);
server.use("/posts", PostRoute);
server.use("/members", MembersRoute);

exports.server = server;
