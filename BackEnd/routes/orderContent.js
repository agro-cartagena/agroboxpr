var express = require('express')
var router = express.Router()
var { validateEntity } = require('../middleware/dataValidation.middleware')
var { userSchema } = require('../middleware/validators.middleware')

const { orderContentController } = require('../controllers')

router.post('/', orderContentController.postContent)
router.get('/', orderContentController.getContent)
router.get('/:id', orderContentController.getContentById)
router.put('/:id', orderContentController.putContent)


module.exports = router