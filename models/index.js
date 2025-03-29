const { sequelize } = require("../config/database");
const { User } = require("./User");
const { Expense } = require("./Expense");

User.hasMany(Expense);
Expense.belongsTo(User, {
  allowNull: false,
});

module.exports = { User, Expense };
