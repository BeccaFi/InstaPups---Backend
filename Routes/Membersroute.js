const express = require('express');
const Membersroute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');
const { GetFollows } = require('../Controllers/MembersControllers/GetFollows');
const { GetMember } = require('../Controllers/MembersControllers/GetMember');

Membersroute.get('/', authenticateUser, GetMembers);
Membersroute.get('/follows', authenticateUser, GetFollows);
Membersroute.get('/:id', authenticateUser, GetMember);

module.exports.Membersroute = Membersroute;