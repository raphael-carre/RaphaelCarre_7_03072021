const CommentController = require('../controllers/commentController')
const router = require('express').Router()

router.get('/', CommentController.getAll)

module.exports = router