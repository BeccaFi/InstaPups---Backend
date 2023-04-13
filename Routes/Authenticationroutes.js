const express = require('express');
const AuthenticationRoute = express.Router();
const { Login } = require('../Controllers/Authenticationcontrollers/Login');
const { Register } = require('../Controllers/Authenticationcontrollers/Register');

AuthenticationRoute.post('/login', Login);
AuthenticationRoute.post('/register', Register);

module.exports.AuthenticationRoute  = AuthenticationRoute;