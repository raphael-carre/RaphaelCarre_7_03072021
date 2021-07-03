/**
 * Comment Controller
 */
class CommentController {
    static async getAll(req, res) {
        res.send(req.params)
    }
}

module.exports = CommentController