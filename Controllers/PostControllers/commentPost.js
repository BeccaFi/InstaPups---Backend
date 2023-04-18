const { ObjectId } = require("mongodb");
const { db } = require("../../Database/Database");
const { commentPostValidation } = require("../../Validations/commentValidation");


exports.commentPost = async function commentPost(req, res) {
    const validation = commentPostValidation(req.body);
  
    if (validation.error) return res.status(400).json(validation.error.details[0].message);
  
    const { username } = req.user;
    const { id, comment } = req.body;
  
    db.Posts.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          comments: { username: username, comment: comment },
        },
      }
    )
      .then(async (result) => {
        const post = await db.Posts.findOne({ _id: new ObjectId(id) });
        const newComment = post.comments[post.comments.length - 1];
        return res.status(200).json({ ...result, newComment });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  };
