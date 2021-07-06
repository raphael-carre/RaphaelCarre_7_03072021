const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userId = Security.decodeJwt(token)

        if (req.body.userId && req.body.userId !== userId) throw new FetchErrorHandler(401, 'Identifiant utilisateur invalide !')
        else next()
    }
    catch (error) {
        res.status(error.statusCode || 401).json({ error: error.message || 'Requête non authentifiée !' })
    }
}

module.exports = auth