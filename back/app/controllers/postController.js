const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')
const Post = require('../models/PostModel')
const User = require('../models/UserModel')
const Comment = require('../models/CommentModel')
const PostLike = require('../models/PostLikeModel')

/**
 * Post Controller
 */
class PostController {
    /**
     * Get every posts from database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getOne(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const options = {
                include: [
                    { model: User, attributes: ['firstName', 'lastName', 'image'] },
                    { model: Comment, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] },
                    { model: PostLike, where: { 'like': true }, required: false, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] }
                ],
                where: { id },
                order: [
                    [{ model: Comment }, 'createdAt', 'DESC'],
                    [{ model: PostLike }, 'updatedAt', 'DESC']
                ]
            }

            const post = await Post.findOne(options)
            if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')

            res.status(200).json(post)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Get every posts from database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getAll(req, res) {
        try {
            const options = {
                include: [
                    { model: User, attributes: ['firstName', 'lastName', 'image'] },
                    { model: Comment, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] },
                    { model: PostLike, where: { 'like': true }, required: false, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] }
                ],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Comment }, 'createdAt', 'DESC'],
                    [{ model: PostLike}, 'updatedAt', 'DESC']
                ]
            }

            const posts = await Post.findAll(options)
            if (typeof posts !== 'object') throw new FetchErrorHandler(500)
            if (posts.length === 0) throw new FetchErrorHandler(404, 'Il n\'existe aucune publication...')

            res.status(200).json(posts)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Get every posts of a specific user from database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getAllFromUser(req, res) {
        try {
            const userId = parseInt(req.params.userId)
            if (isNaN(userId)) throw new FetchErrorHandler(400)

            const options = {
                include: [
                    { model: Comment, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] },
                    { model: PostLike, where: { 'like': true }, required: false, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] }
                ],
                where: { userId },
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Comment }, 'createdAt', 'DESC'],
                    [{ model: PostLike }, 'updatedAt', 'DESC']
                ]
            }

            const posts = await Post.findAll(options)
            if (typeof posts !== 'object') throw new FetchErrorHandler(500)
            if (posts.length === 0) throw new FetchErrorHandler(404, 'Il n\'existe aucune publication...')

            res.status(200).json(posts)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Creates a post in the database based on user id.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async create(req, res) {
        try {
            const {image, content} = req.body
            if (!image && (!content || content === '')) throw new FetchErrorHandler(400, 'Votre publication est vide !')

            const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            const newPost = await Post.create({ image, content, userId })
            if (!newPost) throw new FetchErrorHandler(500)

            res.status(201).json({ message: 'Votre publication est enregistrée !', newPost })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Updates a post in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async update(req, res) {
        try { 
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
            
            const post = await Post.findOne({ attributes: ['userId'], where: { id } })
            if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')
            
            if (!(post.userId === tokenId || req.body.adminUser)) throw new FetchErrorHandler(401)

            const { image, content } = req.body
            if (!image && (!content || content === '')) throw new FetchErrorHandler(400, 'Votre publication est vide !')
    
            const postUpdate = await Post.update({ image, content }, { where: { id } })
            if (postUpdate[0] === 0) throw new FetchErrorHandler(500)

            const updatedPost = await Post.findOne({ where: { id } })
            if (!updatedPost) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Publication mise à jour !', updatedPost })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Deletes a post in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async delete(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            const post = await Post.findOne({ attributes: ['userId'], where: { id } })
            if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')
    
            if (!(post.userId === tokenId || req.body.adminUser)) throw new FetchErrorHandler(401)
    
            const destroyedPost = await Post.destroy({ where: { id } })
            if (destroyedPost === 0) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Publication supprimée !' })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = PostController