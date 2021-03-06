const router = require('express').Router()
const LostPasswordController = require('./LostPasswordController')
const validation = require('../../middlewares/validation')

router.post('/lost', validation, LostPasswordController.lostPwd)
router.post('/reset', validation, LostPasswordController.resetPwd)
router.post('/verify', validation, LostPasswordController.verifyCode)

module.exports = router