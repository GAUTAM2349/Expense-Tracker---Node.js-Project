const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  }
}, { timestamps: false });

module.exports = mongoose.model('Download', downloadSchema);
