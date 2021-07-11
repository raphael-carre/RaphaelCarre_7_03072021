const Sequelize = require('sequelize')
const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')
const Comment = require('../models/CommentModel')
const PostLike = require('../models/PostLikeModel')
const Post = require('../models/PostModel')
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
        try {
            const options = !req.body.adminUser ? { attributes: ['id', 'firstName', 'lastName'] } : { attributes: { exclude: ['password'] }}

            const users = await User.findAll(options)
            if (typeof users !== 'object') throw new FetchErrorHandler(500)
            if (users.length === 0) throw new FetchErrorHandler(404, 'Aucun utilisateur enregistré !')

            res.status(200).json(users)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Gets one user from the database, based on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async getOne(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)
    
            const user = await User.findOne({ 
                attributes: { exclude: ['password'] },
                include: [{ 
                    model: Post, 
                    include: [
                        { model: Comment, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }] },
                        { model: PostLike, where: { 'like': true }, required: false, include: [{ model: User, attributes: ['firstName', 'lastName', 'image'] }]}
                    ]
                }],
                where: { id },
                order: [
                    [{ model: Post }, 'createdAt', 'DESC'],
                    [{ model: Post }, { model: Comment }, 'createdAt', 'DESC'],
                    [{ model: Post }, { model: PostLike }, 'updatedAt', 'DESC'],
                ]
            })
            if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')

            res.status(200).json(user)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Updates one user in the database, base on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async update(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            if (!(id === tokenId || req.body.adminUser)) throw new FetchErrorHandler(401)

            const user = await User.findOne({ attributes: ['id'], where: { id } })
            if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable')
    
            const updateUser = await User.update(req.body, { where: { id } })
            if (updateUser[0] === 0) throw new FetchErrorHandler(500)

            const updatedUser = await User.findOne({ attributes: ['id', 'firstName', 'lastName', 'description', 'email', 'image'], where: { id } })
            if (!updatedUser) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Mise à jour effectuée !', userData: updatedUser })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Deletes one user in the database, based on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async delete(req, res) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) throw new FetchErrorHandler(400)

            const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
            if (!(id === tokenId || req.body.adminUser)) throw new FetchErrorHandler(401)
    
            const destroyedUser = await User.destroy({ where: { id }})
            if (destroyedUser === 0) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Compte utilisateur supprimé !' })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Creates a new user entry in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async register(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body

            const existingUser = await User.findOne({ attributes: ['email'], where: { email } })
            if (existingUser) throw new FetchErrorHandler(400, 'Cette adresse e-mail est déjà utilisée !')

            const usersCount = await User.count()
            if (typeof usersCount !== 'number') throw new FetchErrorHandler(500)
    
            const hash = await Security.hash(password)
            if (!hash) throw new FetchErrorHandler(500)

            const userData = {
                firstName,
                lastName,
                email,
                password: hash,
                isAdmin: usersCount === 0 ? true : false
            }

            const newUser = await User.create(userData)
            if (!newUser) throw new FetchErrorHandler(500)

            res.status(200).json({ message: 'Utilisateur créé !' })
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
    static async login(req, res) {
        try {
            const { email, password } = req.body
    
            const user = await User.findOne({ attributes: ['id', 'email', 'password'], where: { email }})
            if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')
                    
            const isValid = await Security.compareHash(password, user.password)
            if (typeof isValid !== 'boolean') throw new FetchErrorHandler(500)

            if (!isValid) throw new FetchErrorHandler(401, 'Mot de passe incorrect !')

            res.status(200).json({ userId: user.id, token: Security.createJwt(user.id) })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = UserController