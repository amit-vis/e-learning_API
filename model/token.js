const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Token = sequelize.define('Token',{
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isValid:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: true
});

module.exports = Token;