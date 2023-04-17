const express = require('express');
const Membersroute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');
const { GetFollows } = require('../Controllers/MembersControllers/GetFollows');
const { GetMember } = require('../Controllers/MembersControllers/GetMember');
const { FollowMember } = require('../Controllers/MembersControllers/FollowMember');
const { UnFollowMember } = require('../Controllers/MembersControllers/UnFollowMember');

Membersroute.get('/', authenticateUser, GetMembers);
Membersroute.get('/follows', authenticateUser, GetFollows);
Membersroute.get('/:id', authenticateUser, GetMember);
Membersroute.post('/follow', authenticateUser, FollowMember)
Membersroute.delete('/unfollow', authenticateUser, UnFollowMember)

module.exports.Membersroute = Membersroute;