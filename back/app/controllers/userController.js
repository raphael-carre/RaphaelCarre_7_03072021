const Security = require('../classes/Security')

/**
 * User Controller
 */
class UserController {
    static async getAll(req, res) {
        
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