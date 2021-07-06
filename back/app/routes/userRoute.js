const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const validation = require('../middlewares/validation')

const UserController = require('../controllers/userController')
const router = require('express').Router()

router.get('/', auth, admin, UserController.getAll)
router.get('/:id', auth, UserController.getOne)
router.put('/:id', auth, admin, validation, UserController.update)
router.delete('/:id', auth, admin, UserController.delete)
router.post('/register', validation, UserController.register)
router.post('/login', validation, UserController.login)

module.exports = router