const Controller = require('../Controller')
const UserService = require('./UserService')

/**
 * User Controller
 */
class UserController extends Controller {
    constructor(service) {
        super(service)

        this.messages = {
            update: 'Mise à jour effectuée !',
            delete: 'Utilisateur supprimé !'
        }
    }

    /**
     * Creates a new user entry in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    register = async (req, res) => {
        try {
            await this.Service.create(req)
            res.status(201).json({ message: 'Utilisateur créé !' })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * User login method.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    login = async (req, res) => {
        try {
            const datas = await this.Service.login(req)
            res.status(200).json(datas)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = new UserController(UserService)