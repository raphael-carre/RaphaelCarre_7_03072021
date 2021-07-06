const Security = require('../config/Security')
const User = require('../models/UserModel')
const Post = require('../models/PostModel')
const PostLike = require('../models/PostLikeModel')

/**
 * PostLike Controller
 */
class PostLikeController {
    /**
     * Get every liked posts id for a specific user.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getByUser(req, res) {
        const userId = parseInt(req.params.id)

        const user = await User.findOne({ attributes: ['id'], where: { id: userId } })
        if (!user) return res.status(404).json({ error: 'L\'utilisateur que vous recherchez n\'existe pas !' })

        await PostLike.findAll({ where: { userId }})
            .then(likedPosts => res.status(200).json(likedPosts))
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Get every users who liked/disliked a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getByPost(req, res) {
        const postId = parseInt(req.params.id)

        const post = await Post.findOne({ attributes: ['id'], where: { id: postId } })
        if (!post) return res.status(404).json({ error: 'La publication que vous recherchez n\'existe pas !' })

        await PostLike.findAll({ where: { postId } })
            .then(usersLiked => res.status(200).json(usersLiked))
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Creates a row in PostsLikes table or toggles true/false in like column if the row already exists.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async toggle(req, res) {
        const postId = parseInt(req.params.id)
        const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        const post = await Post.findOne({ attributes: ['id'], where: { id: postId } })
        if (!post) return res.status(404).json({ error: 'La publication que vous souhaitez liker/disliker n\'existe pas !' })

        const postLiked = await PostLike.findOne({ where: { postId, userId }})

        if (!postLiked) {
            return await PostLike.create({ userId, postId })
                .then(() => res.status(201).json({ message: 'Vous aimez cette publication !' }))
                .catch(error => res.status(500).json({ error }))
        }

        const like = !postLiked.like
        const message = like ? 'Vous aimez cette publication !' : 'Vous n\'aimez plus cette publication !'
        await PostLike.update({ like }, { where: { id: postLiked.id } })
            .then(() => res.status(200).json({ message }))
            .catch(error => res.status(500).json({ error }))
    }
}

module.exports = PostLikeController