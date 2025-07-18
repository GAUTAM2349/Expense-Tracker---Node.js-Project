const { User } = require("../models");

async function checkIfUser(req, res, next) {
  console.log("came inside checkIfUser middleware");

  try {
    const email = req.body.email;

    if (!email) {
      console.log("returning 1");
      return res.status(404).json({
        success: false,
        error: "Invalid email",
      });
    }


    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User records not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = checkIfUser;
