const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

// course schema
const Courses = sequelize.define('Courses',{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    level:{
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        allowNull: false
    },
    popularity:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
},{
    timestamps: true
});

module.exports = Courses;