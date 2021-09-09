const fs = require('fs')
const FetchErrorHandler = require('../../config/FetchErrorHandler')
const Sequelize = require('sequelize')
const Service = require('../Service')
const Post = require('./PostModel')
const User = require('../User/UserModel')
const Comment = require('../Comment/CommentModel')
const PostLike = require('../PostLike/PostLikeModel')

/**
 * PostService Class
 */
class PostService extends Service {
    constructor(model) {
        super(model)

        this.queryOptions = {
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'commentsCounter']
                ],
            },
            include: [
                { model: User, attributes: ['firstName', 'lastName', 'image'] },
                { model: Comment, required: false, attributes: [] }
            ]
        }
    }

    /**
     * Find all posts in database.
     * @returns {Array} Array of posts
     */
    findAll = async () => {
        const options = {
            ...this.queryOptions,
            order: [['createdAt', 'DESC']],
            group: ['id']
        }

        const posts = await this.Model.findAll(options)
        if (typeof posts !== 'object') throw new FetchErrorHandler(500)
        if (posts.length === 0) throw new FetchErrorHandler(404, 'Il n\'existe aucune publication...')

        return posts
    }

    /**
     * Find on post.
     * @param {Request} req Request
     * @returns {Object} Post
     */
    findOne = async req => {
        const id = this.checkId(req.params.id)

        const options = {
            ...this.queryOptions,
            where: { id }
        }

        const post = await this.Model.findOne(options)
        if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')

        return post
    }

    /**
     * Find all posts for a specific user.
     * @param {Request} req Request
     * @returns {Array} Array of posts
     */
    findAllFromUser = async req => {
        const userId = this.checkId(req.params.userId)

        const options = {
            ...this.queryOptions,
            where: { userId },
            order: [['createdAt', 'DESC']],
            group: ['id', 'Comments.id', 'PostLikes.id']
        }

        const posts = await this.Model.findAll(options)
        if (typeof posts !== 'object') throw new FetchErrorHandler(500)
        if (posts.length === 0) throw new FetchErrorHandler(404, 'Il n\'existe aucune publication...')

        return posts
    }

    /**
     * Creates a new post entry in database.
     * @param {Request} req Request
     * @returns {Object} The new post created
     */
    create = async req => {
        const { content } = req.file ? JSON.parse(req.body.datas) : req.body
        if (!req.file && (!content || content === '')) throw new FetchErrorHandler(400, 'Votre publication est vide !')

        const userId = this.tokenId(req)
        const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null

        const newPost = await this.Model.create({ image, content, userId })
        if (!newPost) throw new FetchErrorHandler(500)

        return newPost
    }

    /**
     * Update a specific post.
     * @param {Request} req Request
     * @returns {Object} The updated post
     */
    update = async req => {
        const id = this.checkId(req.params.id)
        const post = await this.checkIfPostExists(id)
        
        this.tokenId(req, post.userId)

        const { content } = req.file ? JSON.parse(req.body.datas) : req.body
        if (!req.file && (!content || content === '')) throw new FetchErrorHandler(400, 'Votre publication est vide !')

        if (req.file) {
            const filePath = `images/${post.image.split('/images/')[1]}`
            if (fs.existsSync(filePath)) { fs.unlinkSync(filePath) }
        }

        const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : (req.body.image === null ? '' : post.image)

        const postUpdate = await Post.update({ image, content }, { where: { id } })
        if (postUpdate[0] === 0) throw new FetchErrorHandler(500)

        const updatedPost = await Post.findOne({ where: { id } })
        if (!updatedPost) throw new FetchErrorHandler(500)

        return updatedPost
    }

    /**
     * Delete a post entry in database.
     * @param {Request} req Request
     * @returns {Boolean}
     */
    delete = async req => {
        const id = this.checkId(req.params.id)
        const post = await this.checkIfPostExists(id)

        this.tokenId(req, post.userId)

        const filePath = post.image !== null ? `images/${post.image.split('/images/')[1]}` : null

        const destroyedPost = await this.Model.destroy({ where: { id } })
        if (destroyedPost === 0) throw new FetchErrorHandler(500)

        if (fs.existsSync(filePath)) { fs.unlinkSync(filePath) }

        return true
    }
}

module.exports = new PostService(Post)