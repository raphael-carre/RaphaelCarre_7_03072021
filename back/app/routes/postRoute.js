const PostController = require('../controllers/postController')
const router = require('express').Router()

router.get('/', PostController.getAll)

module.exports = router