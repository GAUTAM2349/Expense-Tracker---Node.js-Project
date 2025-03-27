const { Signup } = require("../models/Signup");
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  console.log(" request came for login ");

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await Signup.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid user or password",
      });
    }

    return res.status(200).json({
      message: "Loggedin Successfully",
    });
  } catch (error) {
    console.log("error occured");
    return res.status(500).json({
        
      message: error.message,
    });
  }
};

module.exports = { login };
