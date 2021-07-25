const auth = require('../../middlewares/auth')
const PostLikeController = require('./PostLikeController')
const router = require('express').Router()

router.get('/users/:id', auth, PostLikeController.getByUser)
router.get('/posts/:id', auth, PostLikeController.getByPost)
router.post('/posts/:id', auth, PostLikeController.toggle)

module.exports = router