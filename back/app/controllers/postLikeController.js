const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')
const User = require('../models/UserModel')
const Post = require('../models/PostModel')
const PostLike = require('../models/PostLikeModel')

/**
 * PostLike Controller
 */
class PostLikeController {
    /**
     * Get every liked posts for a specific user.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    async getByUser(req, res) {
        try {
            const userId = parseInt(req.params.id)
            if (isNaN(userId)) throw new FetchErrorHandler(400)
    
            const user = await User.findOne({ attributes: ['id'], where: { id: userId } })
            if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')
    
            const likedPosts = await PostLike.findAll({ where: { userId }})
            if (typeof likedPosts !== 'object') throw new FetchErrorHandler(500)

            res.status(200).json(likedPosts)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Get every users who liked/disliked a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    async getByPost(req, res) {
        try {
            const postId = parseInt(req.params.id)
            if (isNaN(postId)) throw new FetchErrorHandler(400)
    
            const post = await Post.findOne({ attributes: ['id'], where: { id: postId } })
            if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')
    
            const options = {
                include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }],
                where: { postId }
            }

            const usersLiked = await PostLike.findAll(options)
            if (typeof usersLiked !== 'object') throw new FetchErrorHandler(500)

            res.status(200).json(usersLiked)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Creates a row in PostsLikes table or toggles true/false in like column if the row already exists.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    async toggle(req, res) {
        try {
            const postId = parseInt(req.params.id)
            if (isNaN(postId)) throw new FetchErrorHandler(400)

            const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            const post = await Post.findOne({ attributes: ['id'], where: { id: postId } })
            if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')
    
            const postLiked = await PostLike.findOne({ where: { postId, userId }})
    
            if (!postLiked) {
                const newPostLike = await PostLike.create({ userId, postId })
                if (!newPostLike) throw new FetchErrorHandler(500)

                return res.status(201).json({ message: 'Vous aimez cette publication !' })
            }
    
            const like = !postLiked.like
            const message = like ? 'Vous aimez cette publication !' : 'Vous n\'aimez plus cette publication !'

            const postLikeUpdate = await PostLike.update({ like }, { where: { id: postLiked.id } })
            if (postLikeUpdate[0] === 0) throw new FetchErrorHandler(500)

            res.status(200).json({ message })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = new PostLikeController()