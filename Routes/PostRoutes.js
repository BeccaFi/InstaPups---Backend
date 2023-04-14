const express = require('express');
const PostRoutes = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { createPost } = require('../Controllers/PostControllers/CreatePost');

PostRoutes.post('/create', authenticateUser, createPost);



module.exports.PostRoutes = PostRoutes;