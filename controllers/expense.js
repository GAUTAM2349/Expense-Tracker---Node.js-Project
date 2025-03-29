const { Expense, User } = require("../models");

const getExpenses = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user)
      return res.status(400).json({
        message: "Middleware !user error",
      });

    const expenses = await user.getExpenses();

    return res.status(200).json({ expenses: expenses });
  } catch (error) {
    return res.status(500).json({
      message: " \n\nError fetch expenses from database\n\n",
      error: error.message,
    });
  }
};

const addExpense = async (req, res) => {
  const { expenseName, expenseDate, expenseAmount, expenseCategory } = req.body;

  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user)
      return res.status(400).json({
        message: "Middleware !user error",
      });

    const expense = await Expense.create({
      expenseName,
      expenseDate,
      expenseAmount,
      expenseCategory,
      userId: user.id, // Ensure you associate the expense with the current user
    });

    return res.status(201).json({ message: "Successfull" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { expenseName, expenseDate, expenseAmount } = req.body;

  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    expense.expenseName = expenseName;
    expense.expenseDate = expenseDate;
    expense.expenseAmount = expenseAmount;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    const expense = await Expense.findByPk(id);
    await expense.destroy();

    res.status(200).json({
      success: true,
      message: "Deleted successuflly",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

module.exports = { addExpense, updateExpense, getExpenses, deleteExpense };
