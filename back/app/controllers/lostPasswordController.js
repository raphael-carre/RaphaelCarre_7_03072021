/**
 * LostPassword Controller
 */
class LostPasswordController {
    /**
         * Resets user's password.
         * @param {Request} req Request
         * @param {Response} res Response
         */
    static async resetPwd(req, res) {

    }

    /**
     * Sends a random code when user has lost his password.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async lostPwd(req, res) {
        const email = req.body.email

        const user = await User.findOne({ attributes: ['id', 'email'], where: { email } })
        if (!user) throw new FetchErrorHandler(404, 'Utilisateur introuvable !')


    }

} 

module.exports = LostPasswordController