exports.Logout = function Logout(req, res) {
  res.status(200).clearCookie("authToken").json("You are now logged out");
};
