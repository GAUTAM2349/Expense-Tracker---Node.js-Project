const { User } = require("../models/User");
const { Expense } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/auth");
const loggedinUsersOnly = require("../middlewares/loggedinUsersOnly");


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const authenticationToken = setUser(user);

    return res.status(200).json({
      message: "Logged in successfully.",
      token: authenticationToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const isAlreayLoggined =  (req,res) => {

    res.status(200).json({success:true, message : "user loggedin"});
  

}

module.exports = { login,isAlreayLoggined };
