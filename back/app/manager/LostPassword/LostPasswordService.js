const Service = require('../Service')
const LostPasswordModel = require('./LostPasswordModel')

/**
 * LostPassword Service
 */
class LostPasswordService extends Service {
    /**
         * Resets user's password.
         * @param {Request} req Request
         */
    resetPwd = async req => {

    }

    /**
     * Sends a random code when user has lost his password.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    lostPwd = async req => {
        const email = req.body.email

        const user = await User.findOne({ attributes: ['id', 'email'], where: { email } })
        if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')


    }
}

module.exports = new LostPasswordService(LostPasswordModel)