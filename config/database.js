const {Sequelize} = require('sequelize');
require('dotenv').config();

let {DATABASE_URL} = process.env;

// setup the database
const sequelize = new Sequelize(DATABASE_URL)

async function connection(){
    try {
        await sequelize.authenticate();
        console.log("Connection stablished successfully!!")
    } catch (error) {
        console.log("Enable to connect the databse", error)
    }
}

connection();
module.exports = sequelize;
