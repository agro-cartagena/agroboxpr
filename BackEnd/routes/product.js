var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.post('/', auth, productController.postProduct)
router.put('/:id', auth, productController.update)
router.get('/:id', productController.getById)
router.get('/', productController.getProducts)
router.delete('/:id', auth, productController.deletion)

module.exports = router
