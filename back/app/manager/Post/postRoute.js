const auth = require('../../middlewares/auth')
const admin = require('../../middlewares/admin')
const validation = require('../../middlewares/validation')
const PostController = require('./PostController')
const router = require('express').Router()

router.get('/', auth, PostController.getAll)
router.get('/:id', auth, PostController.getOne)
router.get('/user/:userId', auth, PostController.getAllFromUser)
router.post('/', auth, validation, PostController.create)
router.put('/:id', auth, admin, validation, PostController.update)
router.delete('/:id', auth, admin, PostController.delete)

module.exports = router