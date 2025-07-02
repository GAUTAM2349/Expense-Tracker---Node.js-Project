const mongoose = require("mongoose");

const premiumSubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model(
  "PremiumSubscription",
  premiumSubscriptionSchema
);
