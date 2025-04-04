const express = require("express");
const { forgotPassword, forgotPasswordRequest, resetPassword } = require("../controllers/password");
const router = express.Router();

router.post('/forgot-password', forgotPasswordRequest);


module.exports = {router};