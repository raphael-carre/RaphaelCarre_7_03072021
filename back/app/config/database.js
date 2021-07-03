const { Sequelize } = require('sequelize')

module.exports = new Sequelize('groupomania', 'admin', 'admin_password', {
    host: 'db',
    dialect: 'mysql'
})