const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  generatedOrderId: {
    type: String,
    required: true
  },

  orderType: {
    type: String,
    required: true
  },

  orderAmount: {
    type: Number,
    required: true
  },

  orderDate: {
    type: String,
    required: true
  },

  orderPaymentStatus: {
    type: String,
    required: true
  }
}, { timestamps: false });

module.exports = mongoose.model('Order', orderSchema);
