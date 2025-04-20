const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');


const PremiumSubscription = sequelize.define('premiumSubscriptions', {
   
}, {
    timestamps : false
})


module.exports = { PremiumSubscription };