const fs = require('fs')
const FetchErrorHandler = require("../../config/FetchErrorHandler")
const Security = require("../../config/Security")
const Service = require('../Service')
const User = require("./UserModel")
const Post = require("../Post/PostModel")

/**
 * UserService Class
 */
class UserService extends Service {
    /**
     * Find every users.
     * @returns {Object} Users list
     */
    findAll = async () => {
        const payload = await this.Model.findAll({ attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] })
        if (typeof payload !== 'object') throw new FetchErrorHandler(500)
        if (payload.length === 0) throw new FetchErrorHandler(404, 'Aucun utilisateur enregistrĂ© !')
    
        return payload
    }

    /**
     * Find one single user.
     * @param {Request} req Request
     * @param {Object} queryOptions Query options
     * @param {String} errorMessage Custom error message
     * @returns {Object} User datas
     */
    findOne = async (req, queryOptions = null, throwError = true) => {
        const payload = await this.Model.findOne(queryOptions || { attributes: { exclude: ['password'] }, where: { id : req.params.id } })
        if (throwError) {
            if (!payload) throw new FetchErrorHandler(404, 'Utilisateur introuvable')
        }

        return payload
    }

    /**
     * Update one single user.
     * @param {Request} req Request
     * @param {Object} queryOptions Query options
     * @returns {Object} User datas
     */
    update = async (req, queryOptions = null) => {
        const id = this.checkId(req.params.id)
        this.tokenId(req, req.params.id)
        const user = await this.findOne(req, { attributes: ['id', 'image'], where: { id } })
        
        const data = req.file ? JSON.parse(req.body.datas) : req.body

        if (data.password) {
            const hash = await Security.hash(data.password)
            if (!hash) throw new FetchErrorHandler(500)
            data.password = hash
        }
        
        console.log(user, req.file)
        if (user.image && (req.file || (!req.file && !data.image))) {
            const filePath = `images/${user.image.split('/images/')[1]}`
            if (fs.existsSync(filePath)) { fs.unlinkSync(filePath) }
        }

        const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : data.image

        const updateModel = await this.Model.update({...data, image}, queryOptions || { where: { id } })
        if (updateModel[0] === 0) throw new FetchErrorHandler(500)

        const updatedPayload = await this.findOne(req)
        if (!updatedPayload) throw new FetchErrorHandler(500)

        return updatedPayload
    }

    /**
     * Creates a new user entry.
     * @param {Request} req Request
     * @returns {Boolean}
     */
    create = async req => {
        const { firstName, lastName, email, password } = req.body

        const existingEntry = await this.findOne(req, { attributes: ['email'], where: { email } }, false)
        if (existingEntry) throw new FetchErrorHandler(400, 'Cette adresse e-mail est dĂ©jĂ  utilisĂ©e !', 'email')

        const hash = await Security.hash(password)
        if (!hash) throw new FetchErrorHandler(500)
        
        const datas = {
            firstName,
            lastName,
            email,
            password: hash,
            idAdmin: await this.count() === 0 ? true : false,
        }

        const newEntry = await this.Model.create(datas)
        if (!newEntry) throw new FetchErrorHandler(500)

        return true
    }

    /**
     * Delete a user entry.
     * @param {Request} req Request
     * @param {Object} queryOptions Query options
     * @returns {Boolean}
     */
    delete = async (req, queryOptions = null) => {
        this.checkId(req.params.id)
        this.tokenId(req, req.params.id)

        const posts = await Post.findAll({ attributes: ['image'], where: { userId: req.params.id } })
        if (posts) {
            const filteredPosts = posts.filter(post => post.image !== null)

            if (filteredPosts) {
                for (let post of filteredPosts) {
                    const filePath = `images/${post.image.split('/images/')[1]}`
                    if (fs.existsSync(filePath)) { fs.unlinkSync(filePath) }
                }
            }
        }

        const user = await this.Model.findOne({ attributes: ['image'], where: { id: req.params.id } })
        if (user.image) {
            const filePath = `images/${user.image.split('/images/')[1]}`
            if (fs.existsSync(filePath)) { fs.unlinkSync(filePath) }
        }
        
        const destroyedModel = await this.Model.destroy(queryOptions || { where: { id: req.params.id } })
        if (destroyedModel === 0) throw new FetchErrorHandler(500)

        return true
    }

    /**
     * Get login datas for an existing user entry.
     * @param {Request} req Request
     * @returns {Object} User id and user token
     */
    login = async req => {
        const { email, password } = req.body

        const user = await this.Model.findOne({ attributes: ['id', 'email', 'password'], where: { email } })
        if (!user) throw new FetchErrorHandler(404, 'Adresse e-mail incorrecte !', 'email')

        const isValid = await Security.compareHash(password, user.password)
        if (typeof isValid !== 'boolean') throw new FetchErrorHandler(500)

        if (!isValid) throw new FetchErrorHandler(401, 'Mot de passe incorrect !', 'password')
    
        return { userId: user.id, token: Security.createJwt(user.id) }
    }

    /**
     * Get users count.
     * @returns {Number}
     */
    count = async () => {
        const payloadCount = await this.Model.count()
        if (typeof payloadCount !== 'number') throw new FetchErrorHandler(500)

        return payloadCount
    }
}

module.exports = new UserService(User)