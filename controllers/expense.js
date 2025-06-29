const { Expense, User, Download } = require("../models");
const AWS = require("aws-sdk");
const mongoose = require("mongoose");

// GET paginated expenses
const getPaginatedExpenses = async (req, res) => {
  let { page = 1, limit = 10, filterType = "all" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const skip = (page - 1) * limit;
  const user = req.user;
  const userId = req.user._id;
  console.log("inside expense controller user is "+JSON.stringify(user));

  const filter = { userId };

  const now = new Date();
  if (filterType === "current_date") {
    const start = new Date(now.setHours(0, 0, 0, 0));
    const end = new Date(now.setHours(23, 59, 59, 999));
    filter.expenseDate = { $gte: start, $lte: end };
  } else if (filterType === "this_week") {
    const first = now.getDate() - now.getDay();
    const start = new Date(now.setDate(first));
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    filter.expenseDate = { $gte: start, $lte: end };
  } else if (filterType === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    filter.expenseDate = { $gte: start, $lte: end };
  }

  try {
    const totalExpenses = await Expense.countDocuments(filter);
    const expenses = await Expense.find(filter).skip(skip).limit(limit);
    res.status(200).json({ totalExpenses, expenses });
  } catch (error) {
    console.error("Error fetching paginated expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or access denied." });
    }
    res.status(200).json({ expense });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getExpensesCount = async (req, res) => {
  try {
    const count = await Expense.countDocuments();
    res.status(200).json({ expensesCount: count });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addExpense = async (req, res) => {
  const {
    expenseName,
    expenseDate,
    expenseAmount,
    expenseCategory,
    expenseType,
  } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const expense = await Expense.create({
      expenseName,
      expenseDate,
      expenseAmount,
      expenseCategory,
      expenseType,
      userId: user._id,
    });

    if (expenseType === 'debit') {
      user.totalExpense += Number(expenseAmount);
    } else {
      user.totalExpense -= Number(expenseAmount);
    }

    await user.save();

    res.status(201).json({ message: "Expense added successfully." });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { expenseName, expenseDate, expenseAmount } = req.body;

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    const user = await User.findById(expense.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (expense.expenseType === "debit") {
      user.totalExpense =
        user.totalExpense - expense.expenseAmount + Number(expenseAmount);
    } else {
      user.totalExpense =
        user.totalExpense - expense.expenseAmount - Number(expenseAmount);
    }

    await user.save();

    expense.expenseName = expenseName;
    expense.expenseDate = expenseDate;
    expense.expenseAmount = expenseAmount;

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (expense.expenseType === 'debit') {
      user.totalExpense -= Number(expense.expenseAmount);
    } else {
      user.totalExpense += Number(expense.expenseAmount);
    }

    await user.save();
    await expense.deleteOne();

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ success: false, message: "Error deleting expense", error: error.message });
  }
};

async function uploadToS3(data, fileName) {
  let s3Bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  try {
    const { Location } = await s3Bucket.upload(params).promise();
    return Location;
  } catch (err) {
    console.log("Something went wrong", err);
    return null;
  }
}

const downloadExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    const stringifiedExpenses = JSON.stringify(
      expenses,
      ["expenseName", "expenseAmount", "expenseDate", "expenseCategory"],
      2
    );

    const fileName = `Expense_${req.user._id}_${Date.now()}.txt`;
    const fileURL = await uploadToS3(stringifiedExpenses, fileName);

    if (!fileURL) throw new Error("Upload to S3 failed");

    await Download.create({ fileName, userId: req.user._id });

    res.status(200).json({ fileURL, success: true });
  } catch (error) {
    console.error("Error in downloadExpense:", error);
    res.status(500).json({ error: "Failed to download expenses" });
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
