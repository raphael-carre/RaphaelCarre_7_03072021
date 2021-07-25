const Sequelize = require('sequelize')
const { db } = require('../../config/database')
const Post = require('../Post/PostModel')
const User = require('../User/UserModel')

const Comment = db.define('Comment', {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Comment