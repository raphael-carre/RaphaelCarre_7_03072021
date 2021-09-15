const Controller = require('../Controller')
const PostService = require('./PostService')

/**
 * Post Controller
 */
class PostController extends Controller {
    constructor(service) {
        super(service)

        this.messages = {
            create: 'Votre publication est enregistrée !',
            update: 'Publication mise à jour !',
            delete: 'Publication supprimée !'
        }
    }

    /**
     * Get every posts of a specific user from database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    getAllFromUser = async (req, res) => {
        try {
            const posts = await this.Service.findAllFromUser(req)
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
    create = async (req, res) => {
        try {
            const newPost = await this.Service.create(req)
            res.status(201).json({ message: this.messages.create, newPost })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = new PostController(PostService)