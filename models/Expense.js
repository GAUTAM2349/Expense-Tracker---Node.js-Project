const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');


const Expense = sequelize.define( 'expense', {

    expenseName : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    expenseDate : {
        type : DataTypes.STRING,
        allowNull : false
    },

    expenseAmount : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    expenseCategory :{
        type : DataTypes.STRING,
        allowNull : false
    },

    expenseType :{   //credit or debit
        type : DataTypes.STRING,
        allowNull : false
    },

    
}, {
    timestamps : false
});


module.exports = { Expense };