const { ObjectId } = require("mongodb");
const { db } = require("../../Database/Database");
const {
  userProfileValidation,
} = require("../../Validations/userProfileValidation");

exports.userProfile = async function userProfile(req, res) {
  const validation = userProfileValidation(req.params);

  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);

  const { username } = req.user;
  const { id } = req.params;

  const loggedInUser = await db.Users.findOne(
    { username: username },
    { projection: { password: 0 } }
  );

  const clickedUser = await db.Users.findOne(
    { _id: new ObjectId(id) },
    { projection: { password: 0 } }
  );
  const clickedUserUsername = clickedUser.username;

  const follows = loggedInUser.following;

  try {
    if (id === loggedInUser._id.toString()) {
      const userPosts = await db.Posts.find({ username: username })
        .sort({ datePosted: -1 })
        .toArray();
      return res.status(200).json({ user: loggedInUser, posts: userPosts });
    }
    if (follows.includes(clickedUserUsername)) {
      const userPosts = await db.Posts.find({ username: clickedUserUsername })
        .sort({ datePosted: -1 })
        .toArray();
      return res.status(200).json({ user: clickedUser, posts: userPosts });
    }
    return res.status(200).json({
      user: clickedUser,
      message: `You need to follow ${clickedUserUsername} to see their posts.`,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
