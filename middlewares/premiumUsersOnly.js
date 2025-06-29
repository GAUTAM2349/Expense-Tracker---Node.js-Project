const { PremiumSubscription } = require("../models");

async function premiumUsersOnly(req, res, next) {
  try {
    const user = req.user;

    const subscriber = await PremiumSubscription.findOne({ userId: user._id });

    if (!subscriber) {
      return res.status(401).json({ message: "Not a premium user" });
    }

    req.premiumUser = true;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = premiumUsersOnly;
