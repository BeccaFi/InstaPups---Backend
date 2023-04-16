const express = require('express');
const Membersroute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');
const { GetFollows } = require('../Controllers/MembersControllers/GetFollows');

Membersroute.get('/', authenticateUser, GetMembers);
Membersroute.get('/follows', authenticateUser, GetFollows);

module.exports.Membersroute = Membersroute;