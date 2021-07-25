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

    }

    /**
     * Sends a random code when user has lost his password.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    lostPwd = async (req, res) => {

    }

} 

module.exports = new LostPasswordController(LostPasswordService)