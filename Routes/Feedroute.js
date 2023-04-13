const express = require('express');
const Feedroute = express.Router();

const {GetFeed} = require('../Controllers/Feedcontrollers/GetFeed');

Feedroute.get('/', GetFeed);

module.exports.Feedroute = Feedroute;
