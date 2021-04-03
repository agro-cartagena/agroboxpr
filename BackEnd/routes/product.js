var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.post('/', productController.postProduct)
// router.get('/', auth, productController.getProducts)
router.get('/', productController.getProducts)
router.get('/:id', productController.getById)
router.put('/:id', productController.update)
router.delete('/:id', productController.deletion)

module.exports = router
