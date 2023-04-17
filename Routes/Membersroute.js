const express = require('express');
const Membersroute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');
const { GetFollows } = require('../Controllers/MembersControllers/GetFollows');
const { GetMember } = require('../Controllers/MembersControllers/GetMember');
const { FollowMember } = require('../Controllers/MembersControllers/FollowMember');
const { GetMemberInfo } = require('../Controllers/MembersControllers/GetMemberInfo');

Membersroute.get('/', authenticateUser, GetMembers);
Membersroute.get('/follows', authenticateUser, GetFollows);
Membersroute.get('/:id', authenticateUser, GetMember);
Membersroute.patch('/follow', authenticateUser, FollowMember);
Membersroute.get('/memberinfo', authenticateUser, GetMemberInfo);

module.exports.Membersroute = Membersroute;