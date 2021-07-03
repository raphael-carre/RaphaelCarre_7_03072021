/**
 * Post Controller
 */
class PostController {
    static async getAll(req, res) {
        console.log(req.query)
        res.status(200).send('Post Route')
    }
}

module.exports = PostController