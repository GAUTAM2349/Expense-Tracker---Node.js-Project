const express = require('express');
const { signup } = require('../controllers/user');
const router = express.Router();


router.post("/", signup );

module.exports = {router};
