const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("expense_app", "root", "openitsoon", {

    host : 'localhost',
    dialect : 'mysql',

});

const testDatabaseConnection = async () => {

    try{

        await sequelize.authenticate();
        console.log("\n\nDatabase Connected Successfully");
        
    }catch(error){

        console.log("\n\n Error connecting Database : "+error);
        
    }
    
}

testDatabaseConnection();

module.exports = {sequelize};