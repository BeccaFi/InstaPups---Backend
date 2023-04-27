const express = require('express');
const MembersRoute = express.Router();
const { authenticateUser } = require('../Middlewares/checkAuthentication');
const { GetMembers } = require('../Controllers/MembersControllers/GetMembers');
const { GetFollows } = require('../Controllers/MembersControllers/GetFollows');
const { GetMember } = require('../Controllers/MembersControllers/GetMember');
const { FollowMember } = require('../Controllers/MembersControllers/FollowMember');
const { GetUserInfo } = require('../Controllers/MembersControllers/GetUserInfo');
const { profilePic } = require('../Controllers/MembersControllers/ProfilePic');

MembersRoute.get('/userinfo', authenticateUser, GetUserInfo);
MembersRoute.get('/', authenticateUser, GetMembers);
MembersRoute.get('/follows', authenticateUser, GetFollows);
MembersRoute.get('/:id', authenticateUser, GetMember);
MembersRoute.patch('/follow', authenticateUser, FollowMember);
MembersRoute.patch('/settings/profilePicture', authenticateUser, profilePic);



module.exports.MembersRoute = MembersRoute;
