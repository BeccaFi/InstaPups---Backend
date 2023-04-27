exports.Logout = function Logout(req, res) {
return res.status(200).clearCookie("authToken").json("You are now logged out");
};
