const Auth = require('../middlewares/auth')
const UserController = require('../controllers/userController')

const router = require('express').Router()

router.get('/', Auth, UserController.getAll)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router