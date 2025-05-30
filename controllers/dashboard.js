const { sequelize } = require("../config/database");
const { Expense, User } = require("../models");
const { PremiumSubscription } = require("../models/PremiumSubscription");


const premiumDashboard = async (req, res) => {
    try {
      const result = await User.findAll({
        attributes: ["id", "name", "totalExpense"],
        order: [[sequelize.col("totalExpense"), "DESC"]],
      });
  
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching premium dashboard data:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching leaderboard data.",
      });
    }
  };
  

module.exports = { premiumDashboard };