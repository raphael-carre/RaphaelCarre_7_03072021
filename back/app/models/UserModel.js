const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('User', {
    firstName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User