const mongoose = require('mongoose');

const uri = 'mongodb+srv://gautamkumarpandey2526:46NzdHQdmuH42ylB@cluster0.p5jjvek.mongodb.net/Expense-Tracker?retryWrites=true&w=majority&appName=Cluster0';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected using Mongoose');
  } catch (error) {
    console.error('Mongoose connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
