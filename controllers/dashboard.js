const { User } = require("../models");

const premiumDashboard = async (req, res) => {
  try {
    const result = await User.find({}, { name: 1, totalExpense: 1 })
      .sort({ totalExpense: -1 })
      .lean();

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
