// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true,
  },
  expenseDate: {
    type: Date,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  expenseCategory: {
    type: String,
    required: true,
  },
  expenseType: {
    type: String,
    enum: ['debit', 'credit'],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
