const mongoose = require("mongoose");

const forgotPasswordRequestSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    generationTime: {
      type: Date,
      default: Date.now,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { _id: false }
); // To keep `id` as string instead of ObjectId

module.exports = mongoose.model(
  "ForgotPasswordRequest",
  forgotPasswordRequestSchema
);
