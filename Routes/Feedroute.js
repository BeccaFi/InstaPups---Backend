const express = require('express');
const FeedRoute = express.Router();
const { authenticateUser } = require('../Middlewares/checkAuthentication');

const { GetFeed } = require('../Controllers/FeedControllers/GetFeed');

FeedRoute.get('/', authenticateUser, GetFeed);

module.exports.FeedRoute = FeedRoute;
