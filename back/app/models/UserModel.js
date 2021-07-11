const Sequelize = require('sequelize')
const { db } = require('../config/database')
const Post = require('./PostModel')
const Comment = require('./CommentModel')
const PostLike = require('./PostLikeModel')
const LostPassword = require('./LostPassword')

const User = db.define('User', {
    firstName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

User.hasMany(Post, { foreignKey: 'userId', onDelete: 'cascade' })
Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'cascade' })
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

User.hasMany(PostLike, { foreignKey: 'userId', onDelete: 'cascade' })
PostLike.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

User.hasOne(LostPassword, { foreignKey: 'userId', onDelete: 'cascade' })
LostPassword.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' })

module.exports = User