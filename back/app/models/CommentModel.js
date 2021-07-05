const Sequelize = require('sequelize')
const { db } = require('../config/database')
const Post = require('./PostModel')
const User = require('./UserModel')

const Comment = db.define('Comment', {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'cascade' })
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = Comment