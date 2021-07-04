const auth = require('../middlewares/auth')
const PostController = require('../controllers/postController')
const admin = require('../middlewares/admin')
const router = require('express').Router()

router.get('/', auth, PostController.getAll)
router.post('/', auth, PostController.create)
router.put('/:id', auth, admin, PostController.update)
router.delete('/:id', auth, admin, PostController.delete)
router.put('/:id/like', auth, PostController.like)

module.exports = router