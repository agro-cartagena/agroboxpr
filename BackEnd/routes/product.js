var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.post('/', auth, productController.postProduct)
// router.get('/', auth, productController.getProducts)
router.get('/', productController.getProducts)
router.get('/:id', productController.getById)
router.post('/update', auth, productController.update)

module.exports = router
