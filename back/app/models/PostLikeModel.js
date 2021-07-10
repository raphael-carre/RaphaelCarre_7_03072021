const Sequelize = require('sequelize')
const { db } = require ('../config/database')
const Post = require('./PostModel')
const User = require('./UserModel')

const PostLike = db.define('PostLike', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'userId_postId_index'
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'userId_postId_index'
    },
    like: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

module.exports = PostLike