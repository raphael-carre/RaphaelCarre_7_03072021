const FetchErrorHandler = require('../../config/FetchErrorHandler')
const Service = require('../Service')
const Comment = require('./CommentModel')
const Post = require('../Post/PostModel')
const User = require('../User/UserModel')

/**
 * CommentService Class
 */
class CommentService extends Service {
    /**
     * Find every comments for a post.
     * @param {Request} req Request
     * @returns {Object} Contains the number of comments and an array of those comments for a post
     */
    findAll = async req => {
        const postId = this.checkId(req.params.postId)

        await this.checkIfPostExists(postId)

        const options = {
            include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }],
            where: { postId }, order: [['createdAt', 'ASC']]
        }

        const comments = await this.Model.findAll(options)
        if (typeof comments !== 'object') throw new FetchErrorHandler(500)

        return { commentsCounter: comments.length, comments }
    }

    /**
     * Create a new comment.
     * @param {Request} req Request
     * @returns {Object} Contains the number of comments for the post and the newly created comment
     */
    create = async req => {
        const postId = this.checkId(req.params.postId)
        const userId = this.tokenId(req)

        const content = req.body.content || ''
        if (!content || content === '') throw new FetchErrorHandler(400, 'Votre commentaire est vide !')

        await this.checkIfPostExists(postId)

        const newComment = await this.Model.create({ content, postId, userId })
        if (!newComment) throw new FetchErrorHandler(500)

        const commentsCounter = await this.Model.count({ where: { postId } })
        if (typeof commentsCounter !== 'number') throw new FetchErrorHandler(500)

        return { commentsCounter, newComment }
    }

    /**
     * Update a comment.
     * @param {Request} req Request
     * @returns {Object} The updated comment
     */
    update = async req => {
        const id = this.checkId(req.params.id)

        const comment = await this.Model.findOne({ attributes: ['postId', 'userId'], where: { id } })
        if (!comment) throw new FetchErrorHandler(404, 'Commentaire introuvable !')
        
        this.tokenId(req, comment.userId)

        const content = req.body.content || ''
        if (!req.body.content) throw new FetchErrorHandler(400, 'Votre commentaire est vide !')

        const updateComment = await this.Model.update({ content }, { where: { id } })
        if (updateComment[0] === 0) throw new FetchErrorHandler(500)

        const updatedComment = await this.Model.findOne({ where: { id } })
        if (!updateComment) throw new FetchErrorHandler(500)

        return updatedComment
    }

    /**
     * Delete comment entry from database.
     * @param {Request} req Request
     * @returns {Number} The number of comments left for the relative post
     */
    delete = async req => {
        const id = this.checkId(req.params.id)

        const comment = await this.Model.findOne({ attributes: ['postId', 'userId'], where: { id } })
        if (!comment) throw new FetchErrorHandler(404, 'Commentaire introuvable !')

        this.tokenId(req, comment.userId)

        const postId = comment.postId

        const destroyedComment = await this.Model.destroy({ where: { id } })
        if (destroyedComment === 0) throw new FetchErrorHandler(500)

        const commentsCounter = await this.Model.count({ where: { postId } })
        if (typeof commentsCounter !== 'number') throw new FetchErrorHandler(500)

        return commentsCounter
    }
}

module.exports = new CommentService(Comment)