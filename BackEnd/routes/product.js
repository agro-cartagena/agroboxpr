var express = require('express')
var router = express.Router()
var { auth, adminAuth } = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.post('/', adminAuth, productController.postProduct)
router.put('/:id', adminAuth, productController.update)
router.get('/:id', productController.getById)
router.get('/', productController.getProducts)
router.delete('/:id', adminAuth, productController.deletion)

module.exports = router
