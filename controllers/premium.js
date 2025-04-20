const { sequelize } = require("../config/database");
const { Expense, User } = require("../models");
const { PremiumSubscription } = require("../models/PremiumSubscription");

const addPremiumUser = async (req, res) => {
  try {
    const user = req.user;
    const transaction = await sequelize.transaction();

    const Subscription = await PremiumSubscription.create(
      {
        userId: user.id,
        orderId: req.body.orderId,
      },
      { transaction }
    );

    await transaction.commit();
    return res
      .status(201)
      .json({ message: "User added as premium successfully." });
  } catch (error) {
    console.log("\n\n some error in adding premium user " + error.message);
    return res.status(500).json({ error: error.message });
  }
};

const checkIfPremiumUser = async (req, res) => {
  try {
    const user = req.user;

    console.log("\n\n\n\ninside premium user is vghhghg\n\n" + JSON.stringify(user)+"\n\n");

    const subscriber = await PremiumSubscription.findOne({
      where : { userId : user.id}
    });

    console.log("\n\n\n premium user is : " + JSON.stringify(subscriber));

    if (!subscriber) {
      return res
        .status(404)
        .json({ success: false, message: "not premium user" });
    }

    return res.status(200).json({ success: true, message: "premium user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

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

module.exports = { premiumDashboard, addPremiumUser, checkIfPremiumUser };
