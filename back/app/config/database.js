const { Sequelize } = require('sequelize')
const logger = require('./Winston')

const db = new Sequelize('groupomania', process.env.DB_USERNAME, process.env.DB_USER_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? msg => logger.info(`\n${msg}`) : false
})

const dbConnection = async db => {
    await db.authenticate()
        .then(() => {
            db.sync()
            logger.info('Connection to MySQL successful !')
        })
        .catch(error => {
            console.log(error)
            logger.error('Connection to MySQL failed !\n', error.message)
            setTimeout(() => {
                dbConnection(db)
            }, 5000)
        })
}

module.exports = { db, dbConnection }