const Controller = require('../Controller')
const CommentService = require('./CommentService')

/**
 * Comment Controller
 */
class CommentController extends Controller {
    constructor(service) {
        super(service)

        this.messages = {
            create: 'Votre commentaire a été ajouté !',
            update: 'Commentaire mis à jour !',
            delete: 'Commentaire supprimé !'
        }
    }

    /**
     * Gets every comments from database for a specific post.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    getAll = async (req, res) => {
        try {
            const data = await this.Service.findAll(req)
            res.status(200).json(data)
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
    create = async (req, res) => {
        try {
            const newComment = await this.Service.create(req)
            res.status(201).json({ message: this.messages.create, ...newComment })
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
    delete = async (req, res) => {
        try {
            const commentsCounter = await this.Service.delete(req)
            res.status(200).json({ message: this.messages.delete, commentsCounter })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = new CommentController(CommentService)