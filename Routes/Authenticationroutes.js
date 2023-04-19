const express = require('express');
const AuthenticationRoute = express.Router();
const { Login } = require('../Controllers/Authenticationcontrollers/Login');
const { Register } = require('../Controllers/Authenticationcontrollers/Register');
const { NavAuth } = require('../Controllers/Authenticationcontrollers/NavAuth');
const { authenticateUser } = require('../middleware/checkAuthentication');


AuthenticationRoute.post('/login', Login);
AuthenticationRoute.post('/register', Register);
AuthenticationRoute.get('/navauth', authenticateUser, NavAuth);
)

module.exports.AuthenticationRoute  = AuthenticationRoute;