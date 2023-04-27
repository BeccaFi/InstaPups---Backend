const express = require("express");
const AuthenticationRoute = express.Router();
const { Login } = require("../Controllers/AuthenticationControllers/Login");
const { Register } = require("../Controllers/AuthenticationControllers/Register");
const { NavAuth } = require("../Controllers/AuthenticationControllers/NavAuth");
const { authenticateUser } = require("../Middlewares/checkAuthentication");
const { Logout } = require("../Controllers/AuthenticationControllers/Logout");

AuthenticationRoute.post("/login", Login);
AuthenticationRoute.post("/register", Register);
AuthenticationRoute.get("/navauth", authenticateUser, NavAuth);
AuthenticationRoute.delete("/logout", Logout);

module.exports.AuthenticationRoute = AuthenticationRoute;
