const { db } = require("../../Database/Database");
const { ObjectId } = require("mongodb");

exports.deletePost = async function deletePost(req, res) {
  const { id } = req.params;
  const { username } = req.user;

  try {
    const findPost = await db.Posts.findOne({ _id: new ObjectId(id) });
    if (findPost.username !== username)
      return res.status(401).json("You are not authorized to delete this post");

    const deletePost = await db.Posts.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json(deletePost);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
};
