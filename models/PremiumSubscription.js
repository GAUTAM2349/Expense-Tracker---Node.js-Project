const mongoose = require('mongoose');

const premiumSubscriptionSchema = new mongoose.Schema({}, { timestamps: false });

module.exports = mongoose.model('PremiumSubscription', premiumSubscriptionSchema);
