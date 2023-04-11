const express = require('express');
const AuthenticationRoute = express.Router();
const { Login } = require('../Controllers/Authenticationcontrollers/Login');

AuthenticationRoute.post('/login', Login);

module.exports.AuthenticationRoute  = AuthenticationRoute ;