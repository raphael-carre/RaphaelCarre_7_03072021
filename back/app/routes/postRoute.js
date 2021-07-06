const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const PostController = require('../controllers/postController')
const router = require('express').Router()

router.get('/', auth, PostController.getAll)
router.post('/', auth, PostController.create)
router.put('/:id', auth, admin, PostController.update)
router.delete('/:id', auth, admin, PostController.delete)

module.exports = router