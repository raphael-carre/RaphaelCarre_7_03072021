const FetchErrorHandler = require('../../config/FetchErrorHandler')
const Security = require('../../config/Security')
const Service = require('../Service')
const LostPasswordModel = require('./LostPasswordModel')
const User = require('../User/UserModel')

/**
 * LostPassword Service
 */
class LostPasswordService extends Service {
    /**
         * Resets user's password.
         * @param {Request} req Request
         * @returns {Object} Message
         */
    resetPwd = async req => {
        const { email, code, password } = req.body

        const user = await User.findOne({ attributes: ['id'], where: { email }})
        if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')

        const match = await this.Model.findOne({ where: { userId: user.id, code }})
        if (!match) throw new FetchErrorHandler(400, 'Code non valide !')

        const codeDate = Math.floor(Date.parse(match.createdAt) / 1000)
        const currentDate = Math.floor(Date.now() / 1000)

        if (currentDate - codeDate > 300) {
            const destroyedCode = await this.Model.destroy({ where: { id: match.id }})
            if (destroyedCode === 0) throw new FetchErrorHandler(500)
            throw new FetchErrorHandler(400, 'Votre code a expiré !')
        }

        const hash = await Security.hash(password)
        if (!hash) throw new FetchErrorHandler(500)

        const updatedUser = await User.update({ password: hash }, { where: { id: user.id } })
        if (updatedUser[0] === 0) throw new FetchErrorHandler(500)

        const destroyedUsedCode = await this.Model.destroy({ where: { id: match.id }})
        if (destroyedUsedCode === 0) throw new FetchErrorHandler(500)
        
        return { message: 'Votre mot de passe a été modifié !' }
    }

    /**
     * Sends a random code when user has lost his password.
     * @param {Request} req Request
     * @param {Response} res Response
     * @returns {Object} { email, code }
     */
    lostPwd = async req => {
        const email = req.body.email

        const user = await User.findOne({ attributes: ['id', 'email'], where: { email } })
        if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')

        const exisitingCode = await this.Model.findOne({ where: { userId: user.id }})
        if (exisitingCode) {
            const destroyedCode = await this.Model.destroy({ where: { id: exisitingCode.id }})
            if (destroyedCode === 0) throw new FetchErrorHandler(500)
        }

        const code = parseInt((Math.random() * 9 + 1) * Math.pow(10, 8), 10)

        const newCode = await this.Model.create({ email, code, userId: user.id })
        if (!newCode) throw new FetchErrorHandler(500)

        return { email, code }
    }
}

module.exports = new LostPasswordService(LostPasswordModel)