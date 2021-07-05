const Security = require('../config/Security')
const Comment = require('../models/CommentModel')
const Post = require('../models/PostModel')

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
        const postId = parseInt(req.params.postId)

        await Comment.findAll({ where: { postId }, order: [['createdAt', 'ASC']]})
            .then(comments => res.status(200).json({ commentsCounter: comments.length, comments }))
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Creates a comment for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async create(req, res) {
        const postId = parseInt(req.params.postId)
        const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
        
        if (!req.body.content) return res.status(400).json({ error: 'Votre commentaire est vide !' })
        const content = req.body.content

        const post = await Post.findOne({ attributes: ['id'], where: { id: postId }})
        if (!post) return res.status(404).json({ error: 'La publication que vous essayez de commenter n\'existe pas !' })

        await Comment.create({ content, postId, userId })
            .then(async comment => {
                await Comment.count({ where : { postId }})
                    .then(commentsCounter => res.status(201).json({ commentsCounter, comment }))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Updates a comment for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async update(req, res) {
        const id = parseInt(req.params.id)
        const postId = parseInt(req.params.postId)
        const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        if (!req.body.content) return res.status(400).json({ error: 'Votre commentaire est vide !' })
        const content = req.body.content

        const comment = await Comment.findOne({ attributes: ['postId', 'userId'], where: { id, postId } })
        if (!comment) return res.status(404).json({ error: 'Commentaire introuvable !' })
        if (!(comment.userId === userId || req.body.adminUser)) return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })

        await Comment.update({ content }, { where: { id, userId: req.body.adminUser ? comment.userId : userId, postId }})
            .then(async () => {
                await Comment.findOne({ where: { id } })
                    .then(updatedComment => res.status(200).json({ message: 'Commentaire mis à jour !', comment: updatedComment }))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Deletes a comment for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async delete(req, res) {
        const id = parseInt(req.params.id)
        const postId = parseInt(req.params.postId)
        const userId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        const comment = await Comment.findOne({ attributes: ['postId', 'userId'], where: { id, postId } })
        if (!comment) return res.status(404).json({ error: 'Commentaire introuvable !' })
        if (!(comment.userId === userId || req.body.adminUser)) return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })

        await Comment.destroy({ where: { id, userId: req.body.adminUser ? comment.userId : userId, postId }})
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch(error => res.status(500).json({ error }))
    }
}

module.exports = CommentController