const router = require('express').Router()
const userRoute = require('../manager/User/userRoute')
const postRoute = require('../manager/Post/postRoute')
const postLikeRoute = require('../manager/PostLike/postLikeRoute')
const commentRoute = require('../manager/Comment/commentRoute')

router.use('/users', userRoute)
router.use('/posts', postRoute)
router.use('/likes', postLikeRoute)
router.use('/comments', commentRoute)

module.exports = router