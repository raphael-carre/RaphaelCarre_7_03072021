const Auth = require('../middlewares/auth')
const Admin = require('../middlewares/admin')
const UserController = require('../controllers/userController')

const router = require('express').Router()

router.get('/', Auth, Admin, UserController.getAll)
router.get('/:id', Auth, UserController.getOne)
router.put('/:id', Auth, UserController.update)
router.delete('/:id', Auth, Admin, UserController.delete)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router