const express = require("express");
const AuthenticationRoute = express.Router();
const { Login } = require("../Controllers/Authenticationcontrollers/Login");
const { Register } = require("../Controllers/Authenticationcontrollers/Register");
const { NavAuth } = require("../Controllers/Authenticationcontrollers/NavAuth");
const { authenticateUser } = require("../Middlewares/checkAuthentication");
const { Logout } = require("../Controllers/Authenticationcontrollers/Logout");

AuthenticationRoute.post("/login", Login);
AuthenticationRoute.post("/register", Register);
AuthenticationRoute.get("/navauth", authenticateUser, NavAuth);
AuthenticationRoute.delete("/logout", Logout);

module.exports.AuthenticationRoute = AuthenticationRoute;
