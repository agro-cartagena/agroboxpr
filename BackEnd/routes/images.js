var express = require('express')
var router = express.Router()
var upload = require('../middleware/upload.middleware')
const { uploadImage, fetchImage } = require('../controllers/image.controller')

router.post('/upload', upload.single('file'), uploadImage)
router.get('/file/:filename', fetchImage)

module.exports = router
