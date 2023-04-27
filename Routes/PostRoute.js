const express = require("express");
const PostRoute = express.Router();
const { authenticateUser } = require("../Middlewares/checkAuthentication");
const { createPost } = require("../Controllers/PostControllers/CreatePost");
const { toggleLikePost } = require("../Controllers/PostControllers/likePost");
const { commentPost } = require("../Controllers/PostControllers/commentPost");
const { updatePost } = require("../Controllers/PostControllers/updatePost");
const { deletePost } = require("../Controllers/PostControllers/deletePost");

PostRoute.post("/create", authenticateUser, createPost);
PostRoute.patch("/:id/like", authenticateUser, toggleLikePost);
PostRoute.patch("/:id/comment", authenticateUser, commentPost);
PostRoute.patch("/:id/update", authenticateUser, updatePost);
PostRoute.delete("/:id", authenticateUser, deletePost);

module.exports.PostRoute = PostRoute;
