const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');



const Signup = sequelize.define("signup", {

    name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
    
},
{
    timestamps : false
})

module.exports = {Signup};