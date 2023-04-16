const express = require('express');
const Membersroute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');

Membersroute.get('/', authenticateUser, GetMembers);

module.exports.Membersroute = Membersroute;