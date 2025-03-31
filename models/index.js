const { sequelize } = require("../config/database");
const { User } = require("./User");
const { Expense } = require("./Expense");
const { Order } = require("./Order");

User.hasMany(Expense);
Expense.belongsTo(User, {
  allowNull: false,
});

User.hasMany(Order);
Order.belongsTo( User, {
  allowNull : false
})

module.exports = { User, Expense, Order };
