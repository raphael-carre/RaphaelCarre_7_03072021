const auth = require('../../middlewares/auth')
const admin = require('../../middlewares/admin')
const validation = require('../../middlewares/validation')
const CommentController = require('./CommentController')
const router = require('express').Router()

router.get('/post/:postId', auth, CommentController.getAll)
router.post('/post/:postId', auth, validation, CommentController.create)
router.put('/:id', auth, admin, validation, CommentController.update)
router.delete('/:id', auth, admin, CommentController.delete)

module.exports = router