const express = require("express");
const { forgotPassword } = require("../controllers/forgotPassword");
const router = express.Router();

router.post('/', forgotPassword);

module.exports = {router};