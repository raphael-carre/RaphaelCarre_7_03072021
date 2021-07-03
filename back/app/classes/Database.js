const { Sequelize } = require('sequelize')

class Database {
    static async connection() {
        const sequelize = new Sequelize('groupomania', 'admin', 'admin_password', {
            host: 'db',
            dialect: 'mysql'
        })

        await sequelize.authenticate()
            .then(() => console.log('Connection to MySQL successful !'))
            .catch(error => {
                console.error('Connection to MySQL failed !')
                setTimeout(() => {
                    this.connection()
                }, 5000)
            })
    }
}

module.exports = Database