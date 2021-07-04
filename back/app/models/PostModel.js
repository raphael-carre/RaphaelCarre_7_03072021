const Sequelize = require('sequelize')
const { db } = require('../config/database')
const User = require('./userModel')

const Post = db.define('Post', {
    image: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    likes: {
        type: Sequelize.JSON,
        defaultValue: "[]",
        allowNull: false
    },
    likesCounter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    comments: {
        type: Sequelize.JSON,
        defaultValue: "[]",
        allowNull: false
    },
    commentsCounter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = Post