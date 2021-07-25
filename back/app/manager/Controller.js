/**
 * Global Controller class
 */
class Controller {
    constructor(service) {
        this.Service = service
    }

    /**
     * Gets one entry from the database, based on id parameter.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    getOne = async (req, res) => {
        try {
            this.Service.checkId(req.params.id)

            const data = await this.Service.findOne(req)
            res.status(200).json(data)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Gets every entries in database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    getAll = async (req, res) => {
        try {
            const data = await this.Service.findAll()
            res.status(200).json(data)
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Updates an entry in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    update = async (req, res) => {
        try {
            const data = await this.Service.update(req)
            res.status(200).json({ message: this.messages.update, data })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }

    /**
     * Deletes an entry in the database.
     * @param {Request} req Request
     * @param {Response} res Response
     */
    delete = async (req, res) => {
        try {
            await this.Service.delete(req)
            res.status(200).json({ message: this.messages.delete })
        }
        catch (error) {
            res.status(error.statusCode || 500).send(error)
        }
    }
}

module.exports = Controller