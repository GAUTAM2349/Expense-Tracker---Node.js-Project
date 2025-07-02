const express = require('express');
const router = express.Router();
const { login, isAlreayLoggined } = require('../controllers/login');
const loggedinUsersOnly = require('../middlewares/loggedinUsersOnly');


router.post('/', login);
router.get('/check-already-loggedin',loggedinUsersOnly,isAlreayLoggined);

module.exports = { router };