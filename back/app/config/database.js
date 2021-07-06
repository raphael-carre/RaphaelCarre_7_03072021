const { Sequelize } = require('sequelize')
const logger = require('./Winston')

const db = new Sequelize('groupomania', 'admin', 'admin_password', {
    host: 'db',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? msg => logger.info(`\n${msg}`) : false
})

const dbConnection = db => {
    db.authenticate()
        .then(() => {
            db.sync()
            logger.info('Connection to MySQL successful !')
        })
        .catch(error => {
            logger.error('Connection to MySQL failed !\n', error.message)
            setTimeout(() => {
                dbConnection(db)
            }, 5000)
        })
}

module.exports = { db, dbConnection }