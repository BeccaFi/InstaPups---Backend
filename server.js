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

db.connect();

server.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
server.use(cookieParser());
server.use(express.json());
server.use("/auth", AuthenticationRoute);
server.use("/feed", Feedroute)


server.listen(5051);

exports.server = server;
