const auth = require('../../middlewares/auth')
const admin = require('../../middlewares/admin')
const multer = require('../../middlewares/multer-config')
const validation = require('../../middlewares/validation')
const PostController = require('./PostController')
const router = require('express').Router()

router.get('/', auth, PostController.getAll)
router.get('/:id', auth, PostController.getOne)
router.get('/user/:userId', auth, PostController.getAllFromUser)
router.post('/', auth, (req, res, next) => {
    multer(req, res, error => {
        if (error) return res.status(400).json({ message: error.message })
        next()
    })
}, validation, PostController.create)
router.put('/:id', auth, admin, (req, res, next) => {
    multer(req, res, error => {
        if (error) return res.status(400).json({ message: error.message })
        next()
    })
}, validation, PostController.update)
router.delete('/:id', auth, admin, PostController.delete)

module.exports = router