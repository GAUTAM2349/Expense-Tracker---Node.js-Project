const { User } = require("../models/User.js");
const { getUser } = require("../services/auth.js");

async function usersOnly(req, res, next) {
  try {
    const userToken = req.headers["token"];
    console.log(req.headers); 

    if (!userToken) {
      console.log("can't authenticate user");
      
      return res
        .status(401)
        .json({ message: "User not authorised, please login" });
    }
    console.log("found session id");
    const token = userToken.split("Bearer ")[1];
    const userId = getUser(token).id;
    
    if (!userId) return res.status(401).json({ message: "Invalid user" });

    req.userId = userId;
  req.user = await User.findOne( { where : { id : userId} })

    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
}

module.exports = usersOnly;
