const express = require("express");
const { createOrder, updatePaymentStatus } = require("../controllers/cashfree");

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/payment-status/:id", updatePaymentStatus);

module.exports = { router };
