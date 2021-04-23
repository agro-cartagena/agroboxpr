var express = require('express')
var router = express.Router()
var { auth, adminAuth } = require('../middleware/auth.middleware')
var { validateEntity } = require('../middleware/dataValidation.middleware')
var { productSchema } = require('../middleware/validators.middleware')

const { productController } = require('../controllers')

router.post('/', adminAuth, validateEntity(productSchema), productController.postProduct)
router.put('/:id', adminAuth, productController.update)
router.get('/:id', productController.getById)
router.get('/', productController.getProducts)
router.delete('/:id', adminAuth, productController.deletion)

module.exports = router
