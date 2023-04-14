const express = require('express');
const PostRoutes = express.Router();
const { authenticateUser } = require('../middleware/checkAuthentication');
const { createPost } = require('../Controllers/PostControllers/CreatePost');
const { toggleLikePost } = require('../Controllers/PostControllers/likePost');

PostRoutes.post('/create', authenticateUser, createPost);
PostRoutes.patch('/like/:id', authenticateUser, toggleLikePost); // "id" = only the 24 characters within the objectid(). Ex. 64394ad1f2c2cc88bb2ce77e


module.exports.PostRoutes = PostRoutes;