const express = require('express')
const router = express.Router()
const { fetchImage, uploadImageFile } = require('../controllers/upload.controller.js')
const upload = require('../middleware/multer.middleware')

router.get('/file/:filename', fetchImage)
router.post('/upload', upload.single('file'), uploadImageFile)

module.exports = router