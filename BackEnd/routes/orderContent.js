var express = require('express')
var router = express.Router()

const { orderContentController } = require('../controllers')

router.post('/', orderContentController.postOrderContent)
router.get('/', orderContentController.getContent)
router.get('/:id', orderContentController.getContentById)


module.exports = router