const { sequelize } = require("../config/database");
const { User } = require("./User");
const { Expense } = require("./Expense");
const { Order } = require("./Order");
const { ForgotPasswordRequest } = require('./ForgotPasswordRequest');
const { Download } = require("./Downloads");
const { PremiumSubscription } = require("./PremiumSubscription");

// one - many
User.hasMany(Expense);
Expense.belongsTo(User, {
  allowNull: false,
});


User.hasMany(Order);
Order.belongsTo( User, {
  allowNull : false
});

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo( User, {
  allowNull : false
});

User.hasMany(Download);
Download.belongsTo( User, {
  allowNull : false
});

User.hasOne(PremiumSubscription);
PremiumSubscription.belongsTo(User,{
  allowNull : false
})

Order.hasOne(PremiumSubscription);
PremiumSubscription.belongsTo(Order,{
  allowNull: false
});

module.exports = { User, Expense, Order, ForgotPasswordRequest, Download };
