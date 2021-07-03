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
        const { email, password } = req.body

        await Security.hash(password)
            .then(hash => console.log(hash))
            .catch(error => res.status(500).json({ error }))
    }

    static async login(req, res) {
        const { email, password } = req.body


    }
}

module.exports = UserController