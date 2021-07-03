const Security = require('../classes/Security')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userId = Security.decodeJwt(token)

        if (req.body.userId && req.body.userId !== userId) throw 'Identifiant utilisateur invalide !'
        else next()
    }
    catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' })
    }
}

module.exports = auth