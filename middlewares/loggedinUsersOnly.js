const { User } = require("../models/User.js");
const { getUser } = require("../services/auth.js");

async function loggedinUsersOnly(req, res, next) {
  try {
    const userToken = req.headers["token"];

    if (!userToken) {
      return res
        .status(401)
        .json({ message: "User not authorised, please login" });
    }

    const token = userToken.split("Bearer ")[1];
    const userId = getUser(token).id;

    if (!userId) return res.status(401).json({ message: "Invalid user" });

    req.userId = userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user)
      return res.status(400).json({
        message: "User records not found",
      });

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = loggedinUsersOnly;
