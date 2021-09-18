const multer = require('multer')
const Validator = require('../config/Validator.js')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype]
        callback(null, `${Date.now()}.${extension}`)
    }
})

const fileFilter = (req, file, callback) => {
    const validator = new Validator()
    try {
        validator.test(JSON.parse(req.body.datas))
        callback(null, true)
    }
    catch (error) {
        callback(error, false)
    }
}

module.exports = multer({ storage, fileFilter }).single('image')