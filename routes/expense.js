const express = require("express");
const router = express.Router();
const {
  addExpense,
  updateExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");




router.post( '/add-expense', addExpense );

router.get( '/get-expenses', getExpenses );

router.delete( '/delete-expense/:id', deleteExpense)

module.exports = { router };