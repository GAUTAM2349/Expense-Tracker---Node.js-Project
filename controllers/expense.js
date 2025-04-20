const { sequelize } = require("../config/database");
const { Expense, User, Download } = require("../models");
const { Op } = require("sequelize");
const AWS = require("aws-sdk");

// GET paginated expenses
const getPaginatedExpenses = async (req, res) => {
  let { page = 1, limit = 10, filterType = "all" } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const offset = (page - 1) * limit;

  const whereCondition = { userId: req.user.id };

  try {
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
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      whereCondition.expenseDate = { [Op.between]: [startOfMonth, endOfMonth] };
    }

    const totalExpenses = await Expense.count({ where: whereCondition });

    const expenses = await Expense.findAll({
      where: whereCondition,
      limit,
      offset,
    });

    return res.status(200).json({ totalExpenses, expenses });
  } catch (error) {
    console.error("Error fetching paginated expenses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExpense = async (req, res) => {
  console.log("\n\n came to get one expense");
  const expenseId = req.params.id;
  const userId = req.user.id; 

  try {
    const expense = await Expense.findOne({
      where: {
        id: expenseId,
        userId: userId,
      },
    });

    if (!expense) {
      console.log("1111");
      return res
        .status(404)
        .json({ message: "Expense not found or access denied." });
    }
    console.log("sending expense " + expense.toJSON());
    return res.status(200).json({ expense });
  } catch (error) {
    console.error("Error fetching expense:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// GET total count
const getExpensesCount = async (req, res) => {
  try {
    const expensesCount = await Expense.count();
    return res.status(200).json({ expensesCount });
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST new expense
const addExpense = async (req, res) => {
  const {
    expenseName,
    expenseDate,
    expenseAmount,
    expenseCategory,
    expenseType,
  } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const user = req.user;

    const expense = await Expense.create(
      {
        expenseName,
        expenseDate,
        expenseAmount,
        expenseCategory,
        expenseType,
        userId: user.id,
      },
      { transaction }
    );

    let newTotal;
    if( expense.expenseType == 'debit'){
      newTotal = Number(user.totalExpense || 0) + Number(expenseAmount);
    }else{
      newTotal = Number(user.totalExpense || 0) - Number(expenseAmount);
    }
    


    await User.update(
      { totalExpense: newTotal },
      { where: { id: user.id }, transaction }
    );

    await transaction.commit();
    return res.status(201).json({ message: "Expense added successfully." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding expense:", error);
    return res.status(500).json({ error: error.message });
  }
};

// PUT update expense
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

    if (expense.expenseType == "debit")
      user.totalExpense = user.totalExpense - expense.expenseAmount + Number(expenseAmount);
    else user.totalExpense = user.totalExpense - expense.expenseAmount - Number(expenseAmount);
    
    await user.save({ transaction });

    expense.expenseName = expenseName;
    expense.expenseDate = expenseDate;
    expense.expenseAmount = expenseAmount;
    await expense.save({ transaction });

    await transaction.commit();
    return res.status(200).json(expense);
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating expense:", error);
    return res.status(500).json({ error: "Failed to update expense" });
  }
};

// DELETE expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  try {
    const expense = await Expense.findOne({ where: { id }, transaction });
    if (!expense) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    const user = await User.findByPk(req.user.id, { transaction });
    if (!user) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.totalExpense -= expense.expenseAmount;
    await user.save({ transaction });

    await expense.destroy({ transaction });
    await transaction.commit();

    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting expense:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

async function uploadToS3(data, fileName) {
  let s3Bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });

  var params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  try {
    // const url = await s3Bucket.upload(params).promise();
    // return url.Location;
    return "temp";
  } catch (error) {
    return console.log("Something went wrong", err);
  }
}

const downloadExpense = async (req, res) => {
  try {
    let expenses = await req.user.getExpenses(); // fetch expenses from DB
    const stringifiedExpenses = JSON.stringify(
      expenses,
      ["expenseName", "expenseAmount", "expenseDate", "expenseCategory"],
      2
    );

    const fileName = `Expense_${req.user.id}_${Date.now()}.txt`;

    const fileURL = await uploadToS3(stringifiedExpenses, fileName);

    const transaction = await sequelize.transaction();

    await Download.create(
      {
        fileName,
        userId: req.user.id,
      },
      { transaction }
    );

    await transaction.commit();

    console.log("done");
    return res.status(200).json({ fileURL, success: true });
  } catch (error) {
    await transaction.rollback();
    console.error("Error in downloadExpense:", error);
    return res.status(500).json({ error: "Failed to download expenses" });
  }
};

module.exports = {
  addExpense,
  updateExpense,
  getPaginatedExpenses,
  getExpense,
  deleteExpense,
  getExpensesCount,
  downloadExpense,
};
