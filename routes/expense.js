const express = require("express");
const router = express.Router();
const {
  addExpense,
  updateExpense,
  getExpenses,
  deleteExpense,
  getExpensesCount,
  getPaginatedExpenses,
  downloadExpense,
  getExpense
} = require("../controllers/expense");




router.post( '/add-expense', addExpense );

// router.get( '/get-expenses', getExpenses );
// router.get('/get-expenses', getPaginatedExpenses);``

router.get('/get-expenses', getPaginatedExpenses);
router.get('/get-expense/:id', getExpense);
router.get('/get-expenses-count', getExpensesCount);

router.put('/update-expense/:id', updateExpense);
router.delete( '/delete-expense/:id', deleteExpense)

router.get( '/download-expense',downloadExpense);

module.exports = { router };