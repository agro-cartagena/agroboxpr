var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { orderController } = require('../controllers')

router.get('/', orderController.getOrder)
router.get('/:id', orderController.getById)
router.post('/', orderController.postOrder)
router.put('/:id', orderController.update)
router.delete('/:id', orderController.deletion)

module.exports = router
