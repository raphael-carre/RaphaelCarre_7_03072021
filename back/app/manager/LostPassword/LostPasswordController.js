const LostPasswordService = require("./LostPasswordService")

/**
 * LostPassword Controller
 */
class LostPasswordController {
    constructor(service) {
        this.Service = service
    }

    /**
         * Resets user's password.
         * @param {Request} req Request
         * @param {Response} res Response
         */
    resetPwd = async (req, res) => {
        try {
            const data = await this.Service.resetPwd(req)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Sends a random code when user has lost his password.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    lostPwd = async (req, res) => {
        try {
            const data = await this.Service.lostPwd(req)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Verifies user's code.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    verifyCode = async (req, res) => {
        try {
            const data = await this.Service.verifyCode(req)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

} 

module.exports = new LostPasswordController(LostPasswordService)