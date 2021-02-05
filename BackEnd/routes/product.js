var express = require('express');
var router = express.Router();


const { productController } = require('../controllers')

router.post('/', productController.postProduct)
router.get('/', productController.getProducts)

module.exports = router;