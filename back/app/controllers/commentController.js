const Sequelize = require('sequelize')
const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')
const Comment = require('../models/CommentModel')
const Post = require('../models/PostModel')
const User = require('../models/UserModel')

/**
 * Comment Controller
 */
class CommentController {
    /**
     * Gets every comments from database for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getAll(req, res) {
        try {
            const postId = parseInt(req.params.postId)
            if (isNaN(postId)) throw new FetchErrorHandler(400)

            const options = {
                attributes: {
                    include: [
                        [Sequelize.col('User.firstName'), 'userFirstName'],
                        [Sequelize.col('User.lastName'), 'userLastName'],
                        [Sequelize.col('User.image'), 'userImage']
                    ]
                },
                include: [{ model: User, attributes: [] }],
                where: { postId }, order: [['createdAt', 'ASC']]
            }
    
            const comments = await Comment.findAll(options)
            if (typeof comments !== 'object') throw new FetchErrorHandler(500)

            res.status(200).json({ commentsCounter: comments.length, comments })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Creates a comment for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async create(req, res) {
        try {
            const postId = parseInt(req.params.postId)
            if (isNaN(postId)) throw new FetchErrorHandler(400)

            const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
            
            const content = req.body.content || ''
            if (!content || content === '') throw new FetchErrorHandler(400, 'Votre commentaire est vide !')
    
            const post = await Post.findOne({ attributes: ['id'], where: { id: postId }})
            if (!post) throw new FetchErrorHandler(404, 'La publication que vous essayez de commenter n\'existe pas !')
    
            const newComment = await Comment.create({ content, postId, userId })
            if (!newComment) throw new FetchErrorHandler(500)
    
            const commentsCounter = await Comment.count({ where: { postId } })
            if (typeof commentsCounter !== 'number') throw new FetchErrorHandler(500)
    
            res.status(201).json({ message: 'Votre commentaire a été ajouté !', commentsCounter, newComment })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Updates a comment for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async update(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const postId = parseInt(req.params.postId)
            if (isNaN(postId)) throw new FetchErrorHandler(400)

            const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            const comment = await Comment.findOne({ attributes: ['postId', 'userId'], where: { id, postId } })
            if (!comment) throw new FetchErrorHandler(404, 'Commentaire introuvable !')

            if (!(comment.userId === userId || req.body.adminUser)) throw new FetchErrorHandler(401)

            const content = req.body.content || ''
            if (!req.body.content) throw new FetchErrorHandler(400, 'Votre commentaire est vide !')
    
            const updateComment = await Comment.update({ content }, { where: { id, userId: req.body.adminUser ? comment.userId : userId, postId }})
            if (updateComment[0] === 0) throw new FetchErrorHandler(500)

            const updatedComment = await Comment.findOne({ where: { id } })
            if (!updateComment) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Commentaire mis à jour !', comment: updatedComment })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Deletes a comment for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async delete(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const postId = parseInt(req.params.postId)
            if (isNaN(userId)) throw new FetchErrorHandler(400)

            const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            const comment = await Comment.findOne({ attributes: ['postId', 'userId'], where: { id, postId } })
            if (!comment) throw new FetchErrorHandler(404, 'Commentaire introuvable !')

            if (!(comment.userId === userId || req.body.adminUser)) throw new FetchErrorHandler(401)
    
            const destroyedComment = await Comment.destroy({ where: { id, userId: req.body.adminUser ? comment.userId : userId, postId }})
            if (destroyedComment === 0) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Commentaire supprimé !' })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = CommentController