const express = require('express');
const ProfileRoute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { userProfile } = require('../Controllers/ProfileControllers/userProfile');


ProfileRoute.get('/:id', authenticateUser, userProfile);

module.exports.ProfileRoute = ProfileRoute;
