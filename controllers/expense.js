const { sequelize } = require("../config/database");
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

    //deletion pending
    await User.update(
      { totalExpense: user.totalExpense + expenseAmount },
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
  const transaction1 = await sequelize.transaction();

  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id, { transaction: transaction1 });

    if (!expense) {
      console.log("rollbcked");
      transaction1.rollback();
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

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
    console.log(error);
    await transaction1.rollback();
    res.status(500).json({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

module.exports = { addExpense, updateExpense, getExpenses, deleteExpense };
