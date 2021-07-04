const Security = require('../config/Security')
const User = require('../models/UserModel')

/**
 * User Controller
 */
class UserController {
    /**
     * Gets every users in database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getAll(req, res) {
        if (!req.body.adminUser) {
            return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })
        }

        await User.findAll()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(404).json({ error: error.message }))
    }

    /**
     * Gets one user from the database, based on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getOne(req, res) {
        const id = parseInt(req.params.id)

        await User.findOne({ attributes: ['id', 'firstName', 'lastName', 'description', 'email', 'image', 'createdAt'], where: { id } })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(404).json({ error: 'Utilisateur introuvable' }))
    }

    /**
     * Updates one user in the database, base on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async update(req, res) {
        const id = parseInt(req.params.id)
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        if (id !== tokenId) return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })

        await User.update(req.body, { where: { id } })
            .then(async () => {
                await User.findOne({ attributes: ['id', 'firstName', 'lastName', 'description', 'email', 'image'], where: { id } })
                    .then(user => res.status(200).json(user))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(404).json({ error: 'Utilisateur introuvable !' }))
    }

    /**
     * Deletes one user in the database, based on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async delete(req, res) {
        const id = parseInt(req.params.id)
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

        if (!(id === tokenId || req.body.adminUser)) {
            return res.status(401).json({ error: 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !' })
        }

        await User.destroy({ where: { id }})
            .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !' }))
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Creates a new user entry in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async register(req, res) {
        const { firstName, lastName, email, password } = req.body
        const usersCount = await User.count()

        await Security.hash(password)
            .then(async hash => {
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    isAdmin: usersCount === 0 ? true : false
                }

                await User.create(newUser)
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * User login method.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async login(req, res) {
        const { email, password } = req.body

        await User.findOne({ attributes: ['id', 'email', 'password'], where: { email }})
            .then(async user => {
                if (!user) return res.status(404).json({ error: 'Utilisateur introuvable !' })
                
                const userId = user.id

                await Security.compareHash(password, user.password)
                    .then(valid => {
                        if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' })

                        res.status(200).json({ userId, token: Security.createJwt(userId) })
                    })
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(404).json({ error }))
    }
}

module.exports = UserController