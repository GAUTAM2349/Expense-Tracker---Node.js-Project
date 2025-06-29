const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { ForgotPasswordRequest } = require("../models");
const { transporter } = require("../services/nodemailer");

const forgotPasswordRequest = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found.",
    });
  }

  const generatedId = uuidv4();

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.user.email,
    subject: "Password Reset Request",
    html: `<a href="${process.env.BASE_URL}/reset-password/${generatedId}">Click here to reset your password</a>`,
  };

  try {
    const passwordResetRequest = await ForgotPasswordRequest.create({
      _id: generatedId, // Explicitly use generated UUID as _id
      userId: user.id,  // Should be an ObjectId or string as per schema
      isActive: true,
    });

    if (!passwordResetRequest) {
      return res.status(500).json({
        success: false,
        message: "Failed to create reset request.",
      });
    }

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent.",
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send password reset email.",
      error: error.message,
    });
  }
};

module.exports = { forgotPasswordRequest };
