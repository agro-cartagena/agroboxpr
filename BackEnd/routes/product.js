var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.get('/', productController.getProducts)
router.get('/:id', productController.getById)
router.post('/', productController.postProduct)
router.put('/:id', productController.update)
router.delete('/:id', productController.deletion)

module.exports = router
