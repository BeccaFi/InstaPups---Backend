const express = require('express');
const Feedroute = express.Router();
const { authenticateUser } = require('../Middlewares/checkAuthentication');

const { GetFeed } = require('../Controllers/Feedcontrollers/GetFeed');

Feedroute.get('/', authenticateUser, GetFeed);

module.exports.Feedroute = Feedroute;
