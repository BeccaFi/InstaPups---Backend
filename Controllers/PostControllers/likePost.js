const { ObjectId } = require("mongodb");
const { db } = require("../../Database/Database");
const { likePostValidation } = require("../../Validations/likePostValidation");


exports.toggleLikePost = async function toggleLikePost (req, res) {

    const validation = likePostValidation(req.params);

    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    
    const {username} = req.user;
    const {id} = req.params;
    
    // $cond needs a boolean value to return then if true, else if false. $in does not return boolean, tried converting it but didn't work (odd response). Save for future fix.
    // db.Posts.updateOne({_id: new ObjectId(id)}, {$cond: {if: {$toBool: {likes: {$in: [username]}}}}, then: {$pull: {likes: username}}, else: {$push: {likes: username}}})

    //This will do in the meantime

    const post = await db.Posts.findOne({ _id: new ObjectId(id), likes: { $in: [username] } });
    
if (post) {
  // User has already liked the post, so remove the like
  db.Posts.updateOne({ _id: new ObjectId(id) }, { $pull: { likes: username } })
    .then(async (result) => {
        
    await db.Posts.findOne(
        { _id: new ObjectId(id) },
        { projection: { likes: 1, _id: 0 } }
      ).then((newLikes) => {
      return res.status(200).json(newLikes);
    })
.catch ((err) => {
        return res.status(500).json(err);
        })
})
    .catch((err) => {
      return res.status(500).json(err);
    });
} else {
  // User has not yet liked the post, so add the like
  db.Posts.updateOne({ _id: new ObjectId(id) }, { $push: { likes: username } })
    .then(async (result) => {
    await db.Posts.findOne(
        { _id: new ObjectId(id) },
        { projection: { likes: 1, _id: 0 } }
      ).then((newLikes) => {
      return res.status(200).json(newLikes);
    })
.catch ((err) => {
        return res.status(500).json(err);
        })
})
    .catch((err) => {
      return res.status(500).json(err);
    });
}
}






