const Security = require('../config/Security')
const User = require('../models/UserModel')

const adminAuth = async (req, res, next) => {
    const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])

    const currentUser = await User.findOne({ attributes: ['isAdmin'], where: { id: tokenId } })
    if (!currentUser) return res.status(401).json({ error: 'Cette action n\'est pas autorisée !' })

    if (!req.body.adminUser && currentUser.isAdmin && req.body.adminUser === undefined) { req.body.adminUser = true }

    next()
}

module.exports = adminAuth