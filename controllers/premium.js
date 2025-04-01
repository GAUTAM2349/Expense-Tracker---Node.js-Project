const { sequelize } = require("../config/database");
const { Expense, User } = require("../models");

const premiumDashboard = async (req, res) => {
  try {
    const result = await User.findAll({
      attributes: ["id", "name", "totalExpense"],

      order: [[sequelize.col("totalExpense"), "DESC"]],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

module.exports = { premiumDashboard };
