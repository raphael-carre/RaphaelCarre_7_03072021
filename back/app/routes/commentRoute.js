const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const CommentController = require('../controllers/commentController')
const router = require('express').Router({ mergeParams: true })

router.get('/', auth, CommentController.getAll)
router.post('/', auth, CommentController.create)
router.put('/:id', auth, admin, CommentController.update)
router.delete('/:id', auth, admin, CommentController.delete)

module.exports = router