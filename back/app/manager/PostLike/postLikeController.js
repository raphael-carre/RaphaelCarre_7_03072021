const PostLikeService = require('./PostLikeService')

/**
 * PostLike Controller
 */
class PostLikeController {
    constructor(service) {
        this.Service = service
    }
    
    /**
     * Get every liked posts for a specific user.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    getByUser = async (req, res) => {
        try {
            const likedPosts = await this.Service.getByUser(req)
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
    getByPost = async (req, res) => {
        try {
            const usersLiked = await this.Service.getByPost(req)
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
    toggle = async (req, res) => {
        try {
            const message = await this.Service.toggle(req)
            res.status(200).json({ message })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = new PostLikeController(PostLikeService)