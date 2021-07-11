const Sequelize = require('sequelize')
const { db } = require('../config/database')

const LostPassword = db.define('LostPassword', {
    code: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = LostPassword