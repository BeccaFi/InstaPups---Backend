const joi = require("joi");
const { db } = require("../../Database/Database");
const { ObjectId } = require("mongodb");
const { updatePostValidation } = require("../../Validations/updatePostsValidation");

exports.updatePost = async function updatePost(req, res) {
  const id = req.params.id;
  const { text, photos } = req.body;

  const validation = updatePostValidation(req.body);

  if (validation.error) {
    return res.status(400).json(validation.error.details[0].message);
  }

  await db.Posts.updateOne({ _id: new ObjectId(id) }, { $set: { content: { text: text, photos: photos } } })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
