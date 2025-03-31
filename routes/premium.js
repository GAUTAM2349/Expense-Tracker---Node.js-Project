const express = require("express");
const { premiumDashboard } = require("../controllers/premium");
const router = express.Router();

router.get("/dashboard", premiumDashboard);

module.exports = {router};
