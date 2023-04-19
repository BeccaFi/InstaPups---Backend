const express = require("express");
const deleteRoute = express.Router();
const { authenticateUser } = require("../middleware/checkAuthentication");
const { deletePost } = require("../Controllers/Deletecontroller/deletePost");

deleteRoute.delete("/:id", authenticateUser, deletePost);

module.exports.deleteRoute = deleteRoute;
