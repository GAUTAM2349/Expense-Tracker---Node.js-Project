const bcrypt = require("bcrypt");
const { User } = require("../models");
const { ForgotPasswordRequest } = require("../models");

const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.id;

    console.log(JSON.stringify(req.user));

    const forgotPasswordRequest = await ForgotPasswordRequest.findOne({ _id: userId });

    if (!forgotPasswordRequest || !forgotPasswordRequest.isActive) {
      return res.status(400).json({
        message: "Reset link has expired or is no longer valid.",
      });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    await ForgotPasswordRequest.findByIdAndUpdate(forgotPasswordRequest._id, {
      isActive: false,
    });

    return res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while updating the password.",
      error: error.message,
    });
  }
};

module.exports = { resetPassword };
