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
    const post = await db.Posts.findOne({_id: new ObjectId(id)}, {projection: {likes: 1, _id: 0}});
    
    if(post.likes.includes(username)){
        db.Posts.updateOne({_id: new ObjectId(id)},{$pull: {likes: username}})
           .then(result => {
        return res.status(200).json(result);
    })
    .catch(err => {
        return res.status(500).send(err);
    })
    } else {
        db.Posts.updateOne({_id: new ObjectId(id)},{$push: {likes: username}})
        .then(result => {
     return res.status(200).json(result);
 })
 .catch(err => {
     return res.status(500).send(err);
 })
    }
 
}
