const express = require("express");
const PostRoutes = express.Router();
const { authenticateUser } = require("../middleware/checkAuthentication");
const { createPost } = require("../Controllers/PostControllers/CreatePost");
const { toggleLikePost } = require("../Controllers/PostControllers/likePost");
const { commentPost } = require("../Controllers/PostControllers/commentPost");
const { updatePost } = require("../Controllers/PostControllers/updatePost");

PostRoutes.post("/create", authenticateUser, createPost);

PostRoutes.patch("/:id/like", authenticateUser, toggleLikePost); // "id" = only the 24 characters within the objectid(). Ex. 64394ad1f2c2cc88bb2ce77e
PostRoutes.patch("/:id/comment", authenticateUser, commentPost); //should be patch for updates BUT we can't send long comments with whitespaces etc. in params/queries
PostRoutes.patch("/update/:id", authenticateUser, updatePost);

module.exports.PostRoutes = PostRoutes;
