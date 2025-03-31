const { sequelize } = require('../config/database');
const { Expense, User } = require("../models");

const premiumDashboard = async (req, res) => {
  try {
    const result = await Expense.findAll({
      attributes: [
        "userId",
        [sequelize.fn("SUM", sequelize.col("expenseAmount")), "totalExpense"],
      ],
      group: ["userId"],
      include: [
        {
          model: User,
          attributes: ["name"],
          required: true,
        },
      ],
      order: [[sequelize.fn("SUM", sequelize.col("expenseAmount")), "DESC"]],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

module.exports = { premiumDashboard };
