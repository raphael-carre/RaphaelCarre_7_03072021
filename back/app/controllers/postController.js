const Security = require('../config/Security')
const Post = require('../models/PostModel')

/**
 * Post Controller
 */
class PostController {
    /**
     * Get every posts from database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getAll(req, res) {
        await Post.findAll({ order: [['createdAt', 'DESC']] })
            .then(posts => res.status(200).json(posts))
            .catch(error => res.status(404).json({ error: 'Il n\'existe aucune publication...' }))
    }

    /**
     * Creates a post in the database based on user id.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async create(req, res) {
        const {image, content} = req.body
        const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        if (!image && !content) return res.status(400).json({ error: 'Votre publication est vide !' })

        await Post.create({ image, content, userId })
            .then(post => res.status(201).json({ message: 'Votre publication est enregistrée !', post }))
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Updates a post in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async update(req, res) {
        const id = parseInt(req.params.id)
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        const post = await Post.findOne({ attributes: ['userId'], where: { id } })

        if (!req.body.image && !req.body.content) return res.status(400).json({ error: 'Votre publication est vide !' })

        const updatedPost = { image: req.body.image, content: req.body.content }

        if (!(post.userId === tokenId || req.body.adminUser)) return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })

        await Post.update(updatedPost, { where: { id } })
            .then(async () => {
                await Post.findOne({ where: { id } })
                    .then(post => res.status(200).json({ message: 'Publication mise à jour !', post }))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(404).json({ error: 'Publication introuvable !' }))
    }

    /**
     * Deletes a post in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async delete(req, res) {
        const id = parseInt(req.params.id)
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        const post = await Post.findOne({ attributes: ['userId'], where: { id } })

        if (!(post.userId === tokenId || req.body.adminUser)) return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })

        await Post.destroy({ where: { id } })
            .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Adds / Removes a 'like' for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async like(req, res) {
        const id = parseInt(req.params.id)
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
        
        const post = await Post.findOne({ attributes: ['likes', 'likesCounter'], where: { id } })
        
        const likes = JSON.parse(post.likes)
        const alreadyLiked = likes.filter(value => value === tokenId).length

        const updatedPost = {
            likes: JSON.stringify(!alreadyLiked ? [...likes, tokenId] : likes.filter(id => id !== tokenId)),
            likesCounter: !alreadyLiked ? post.likesCounter + 1 : post.likesCounter - 1
        }

        const message = !alreadyLiked ? 'Vous avez mis un like à la publication !' : 'Vous n\'aimez plus cette publication !'
        
        await Post.update(updatedPost, { where: { id } })
            .then(() => res.status(200).json({ message }))
            .catch(error => res.status(500).json({ error }))
    }
}

module.exports = PostController