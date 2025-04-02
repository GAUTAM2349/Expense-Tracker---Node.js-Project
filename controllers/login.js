const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/auth");
const { Expense } = require("../models");

const login = async (req, res) => {

  console.log(process.env.PORT);
  
  
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {

    const expense = await Expense.findOne( { where : {id : 10}});
    console.log("\n\n Expense is "+ JSON.stringify(expense));
    
    const user = await User.findOne({
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

    const authenticationToken = setUser(user);

    return res.status(200).json({
      message: "Loggedin Successfully",
      token: authenticationToken,
    });
  } catch (error) {
    console.log("error occured");
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { login };
