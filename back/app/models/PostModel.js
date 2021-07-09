const Sequelize = require('sequelize')
const { db } = require('../config/database')
const User = require('./UserModel')

const Post = db.define('Post', {
    image: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    }
})

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = Post