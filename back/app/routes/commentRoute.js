const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const validation = require('../middlewares/validation')
const CommentController = require('../controllers/commentController')
const router = require('express').Router({ mergeParams: true })

router.get('/', auth, CommentController.getAll)
router.post('/', auth, validation, CommentController.create)
router.put('/:id', auth, admin, validation, CommentController.update)
router.delete('/:id', auth, admin, CommentController.delete)

module.exports = router