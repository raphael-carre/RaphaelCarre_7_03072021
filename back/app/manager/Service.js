const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require("../config/Security")
const Post = require('./Post/PostModel')

/**
 * Global Service class
 */
class Service {
    constructor(model) {
        this.Model = model
    }

    /**
     * Check if id is valid.
     * @param {Number} id Id
     * @returns {boolean}
     */
    checkId = id => {
        const verifyedId = parseInt(id)
        if (isNaN(verifyedId)) throw new FetchErrorHandler(400)
        return verifyedId
    }

    /**
     * Verify a JWT and returns a decoded id.
     * @param {Request} req Request
     * @returns {Number} id decoded from token 
     */
    tokenId = (req, id = null) => {
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
        if (id && (!(parseInt(id) === tokenId || req.body.adminUser))) throw new FetchErrorHandler(401)

        return tokenId
    }

    /**
     * Check if a post entry exists in database.
     * @param {Number} id Post id
     * @returns {Object} {id, userId}
     */
    checkIfPostExists = async id => {
        const post = await Post.findOne({ attributes: ['id', 'userId'], where: { id } })
        if (!post) throw new FetchErrorHandler(404, 'Publication introuvable !')

        return post
    }
}

module.exports = Service