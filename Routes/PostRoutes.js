const express = require("express");
const PostRoutes = express.Router();
const { authenticateUser } = require("../Middlewares/checkAuthentication");
const { createPost } = require("../Controllers/PostControllers/createPost");
const { toggleLikePost } = require("../Controllers/PostControllers/likePost");
const { commentPost } = require("../Controllers/PostControllers/commentPost");
const { updatePost } = require("../Controllers/PostControllers/updatePost");
const { deletePost } = require("../Controllers/PostControllers/deletePost");

PostRoutes.post("/create", authenticateUser, createPost);
PostRoutes.patch("/:id/like", authenticateUser, toggleLikePost);
PostRoutes.patch("/:id/comment", authenticateUser, commentPost);
PostRoutes.patch("/:id/update", authenticateUser, updatePost);
PostRoutes.delete("/:id", authenticateUser, deletePost);

module.exports.PostRoutes = PostRoutes;
