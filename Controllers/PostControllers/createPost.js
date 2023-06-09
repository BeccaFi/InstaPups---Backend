const { db } = require("../../Database/Database");
const { createPostValidation } = require("../../Validations/createPostValidation");



exports.createPost = async function createPost (req, res) {

    const validation = createPostValidation(req.body);

    if (validation.error) return res.status(400).json(validation.error.details[0].message);
    
    const {username} = req.user;
    const {datePosted, text, photos} = req.body;
    
    db.Posts.insertOne({username: username, datePosted: datePosted, content: {text: text, photos: photos}, likes: [], comments: []})
    .then(result => {
        return res.status(201).json(result);
    })
    .catch(err => {
        return res.status(500).json(err);
    })
}