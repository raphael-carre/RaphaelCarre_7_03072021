const { Sequelize } = require('sequelize')

const db = new Sequelize('groupomania', 'admin', 'admin_password', {
    host: 'db',
    dialect: 'mysql'
})

const dbConnection = db => {
    db.authenticate()
        .then(() => {
            db.sync()
            console.log('Connection to MySQL successful !')
        })
        .catch(error => {
            console.error('Connection to MySQL failed !\n', error.message)
            setTimeout(() => {
                dbConnection(db)
            }, 5000)
        })
}

module.exports = { db, dbConnection }