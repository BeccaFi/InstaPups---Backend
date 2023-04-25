const express = require('express');
const Membersroute = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');
const { GetFollows } = require('../Controllers/MembersControllers/GetFollows');
const { GetMember } = require('../Controllers/MembersControllers/GetMember');
const { FollowMember } = require('../Controllers/MembersControllers/FollowMember');
const { GetUserInfo } = require('../Controllers/MembersControllers/GetUserInfo');
const { profilePic } = require('../Controllers/MembersControllers/ProfilePic');

Membersroute.get('/userinfo', authenticateUser, GetUserInfo);
Membersroute.get('/', authenticateUser, GetMembers);
Membersroute.get('/follows', authenticateUser, GetFollows);
Membersroute.get('/:id', authenticateUser, GetMember);
Membersroute.patch('/follow', authenticateUser, FollowMember);
Membersroute.patch('/settings/profilePicture', authenticateUser, profilePic);



module.exports.Membersroute = Membersroute;