const auth = require('../../middlewares/auth')
const admin = require('../../middlewares/admin')
const multer = require('../../middlewares/multer-config')
const validation = require('../../middlewares/validation')

const UserController = require('./UserController')
const router = require('express').Router()

router.get('/', auth, admin, UserController.getAll)
router.get('/:id', auth, UserController.getOne)
router.put('/:id', auth, admin, (req, res, next) => {
    multer(req, res, error => {
        if (error) return res.status(400).json({ message: error.message })
        next()
    })
}, validation, UserController.update)
router.delete('/:id', auth, admin, UserController.delete)
router.post('/register', validation, UserController.register)
router.post('/login', validation, UserController.login)

module.exports = router