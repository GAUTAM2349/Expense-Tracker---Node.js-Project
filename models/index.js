const { sequelize } = require("../config/database");
const { User } = require("./User");
const { Expense } = require("./Expense");
const { Order } = require("./Order");
const { ForgotPasswordRequest } = require('./ForgotPasswordRequest')

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
})

module.exports = { User, Expense, Order, ForgotPasswordRequest };
