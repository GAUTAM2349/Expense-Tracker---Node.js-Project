const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');


const Download = sequelize.define('downloads',{

    fileName : {
        type : DataTypes.STRING,
        allowNull : false
    }
    
    
})

module.exports = { Download };  