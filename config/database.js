const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

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

