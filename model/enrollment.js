const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Courses = require('./courses'); // Assuming this is your Courses model file
const User = require('./user'); // Assuming this is your User model file

// Enrollment schema
const Enrollment = sequelize.define('Enrollment', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Courses,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Establish relationships
User.belongsToMany(Courses, { through: Enrollment, foreignKey: 'userId' });
Courses.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId' });

module.exports = Enrollment;