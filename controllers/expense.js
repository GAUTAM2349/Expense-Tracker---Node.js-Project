const { sequelize } = require("../config/database");
const { Expense, User } = require("../models");
const { Op } = require("sequelize");

const getPaginatedExpenses = async (req, res) => {
  const { page = 1, limit = 10, filterType = "all" } = req.query;
  const offset = (page - 1) * limit;

  let whereCondition = {};

  if (filterType === "current_date") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    whereCondition.expenseDate = { [Op.between]: [today, endOfDay] };
  } else if (filterType === "this_week") {
    const now = new Date();
    const day = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    whereCondition.expenseDate = { [Op.between]: [startOfWeek, endOfWeek] };
  } else if (filterType === "this_month") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    whereCondition.expenseDate = { [Op.between]: [startOfMonth, endOfMonth] };
  }

  try {
    const totalExpenses = await Expense.count({ where: whereCondition });

    const expenses = await Expense.findAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      totalExpenses,
      expenses,
    });
  } catch (error) {
    console.error("Error fetching paginated expenses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExpensesCount = async (req, res) => {
  try {
    const expensesCount = await Expense.count();
    return res.status(200).json({ expensesCount });
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addExpense = async (req, res) => {
  const { expenseName, expenseDate, expenseAmount, expenseCategory } = req.body;
  const transaction1 = await sequelize.transaction();
  try {
    const user = req.user;

    const expense = await Expense.create(
      {
        expenseName,
        expenseDate,
        expenseAmount,
        expenseCategory,
        userId: user.id,
      },
      {
        transaction: transaction1,
      }
    );

    await User.update(
      { totalExpense: Number(user.totalExpense) + Number(expenseAmount) },
      { where: { id: user.id }, transaction: transaction1 }
    );

    await transaction1.commit();

    return res.status(201).json({ message: "Successfull" });
  } catch (error) {
    console.log(error);
    await transaction1.rollback();
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { expenseName, expenseDate, expenseAmount } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const expense = await Expense.findByPk(id, { transaction });
    if (!expense) {
      await transaction.rollback();
      return res.status(404).json({ error: "Expense not found" });
    }

    const user = await User.findByPk(expense.userId, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    user.totalExpense -= expense.expenseAmount;
    user.totalExpense += expenseAmount;

    await user.save({ transaction });

    expense.expenseName = expenseName;
    expense.expenseDate = expenseDate;
    expense.expenseAmount = expenseAmount;

    await expense.save({ transaction });

    await transaction.commit();
    res.status(200).json(expense);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  console.log("came to delete..");
  try {
    const transaction1 = await sequelize.transaction();

    const id = req.params.id;

    const expense = await Expense.findOne({ where: { id: id } });

    console.log("expense is " + JSON.stringify(expense));

    if (!expense) {
      console.log("rollbcked");
      await transaction1.rollback();
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    console.log("got expense");
    await User.update(
      {
        totalExpense: req.user.totalExpense - expense.expenseAmount,
      },
      { where: { id: req.user.id }, transaction: transaction1 }
    );

    await expense.destroy({ transaction: transaction1 });

    await transaction1.commit();

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log("rollbacked 2");
    console.log(error);
    await transaction1.rollback();
    res.status(500).json({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

module.exports = {
  addExpense,
  updateExpense,
  getPaginatedExpenses,
  deleteExpense,
  getExpensesCount,
};
