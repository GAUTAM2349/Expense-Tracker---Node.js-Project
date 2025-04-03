const {sequelize} = require('../config/database');
const {DataTypes, BOOLEAN} = require('sequelize');

const ForgotPasswordRequest = sequelize.define('forgot_password_requests', {

    id : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },

    isActive : {
        type : BOOLEAN,
        defaultValue : false
    }
    
});

module.exports = {ForgotPasswordRequest};