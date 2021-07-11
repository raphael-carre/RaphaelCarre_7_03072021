const Sequelize = require('sequelize')
const { db } = require('../config/database')
const Comment = require('./CommentModel')
const PostLike = require('./PostLikeModel')

const Post = db.define('Post', {
    image: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    }
})

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'cascade' })
Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'cascade' })

Post.hasMany(PostLike, { foreignKey: 'postId', onDelete: 'cascade' })
PostLike.belongsTo(Post, { foreignKey: 'postId', onDelete: 'cascade' })

module.exports = Post