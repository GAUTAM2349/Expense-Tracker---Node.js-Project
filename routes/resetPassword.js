const express = require("express");
const { resetPassword } = require("../controllers/resetPassword");
const router = express.Router();
resetPassword

router.post('/', resetPassword);

module.exports = {router};