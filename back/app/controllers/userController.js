const Security = require('../config/Security')
const User = require('../models/UserModel')

/**
 * User Controller
 */
class UserController {
    static async getAll(req, res) {
        User.findAll()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(404).json({ error: error.message }))
    }

    static async register(req, res) {
        const { firstName, lastName, email, password } = req.body

        await Security.hash(password)
            .then(async hash => {
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    password: hash
                }

                await User.create(newUser)
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }

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