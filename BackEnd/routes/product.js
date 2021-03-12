var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth.middleware')

const { productController } = require('../controllers')

router.post('/', auth, productController.postProduct)
router.get('/', auth, productController.getProducts)

module.exports = router;