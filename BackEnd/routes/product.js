var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.post('/', productController.postProduct)
// router.get('/', auth, productController.getProducts)
router.get('/', productController.getProducts)
router.get('/:id', productController.getById)

module.exports = router
