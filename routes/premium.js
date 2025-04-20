const express = require("express");
const { premiumDashboard, addPremiumUser, checkIfPremiumUser } = require("../controllers/premium");
const premiumUsersOnly = require("../middlewares/premiumUsersOnly");
const router = express.Router();

router.post("/add-user", addPremiumUser);
router.get("/is-premium-user", checkIfPremiumUser)
router.get("/dashboard", premiumUsersOnly, premiumDashboard);

module.exports = {router};
