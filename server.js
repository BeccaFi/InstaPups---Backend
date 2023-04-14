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
const { PostRoutes } = require("./Routes/PostRoutes");
const portfinder = require('portfinder');




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
server.use("/posts", PostRoutes);

portfinder.getPort((err, port) => {
    if (err) {
      console.error(err);
      return;
    }
  
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });



exports.server = server;
