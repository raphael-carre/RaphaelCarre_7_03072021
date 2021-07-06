const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const UserController = require('../controllers/userController')
const router = require('express').Router()

router.get('/', auth, admin, UserController.getAll)
router.get('/:id', auth, UserController.getOne)
router.put('/:id', auth, admin, UserController.update)
router.delete('/:id', auth, admin, UserController.delete)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router