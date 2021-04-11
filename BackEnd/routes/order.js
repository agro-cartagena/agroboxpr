var express = require('express')
var router = express.Router()
var auth = require('../middleware/auth.middleware')

const { orderController } = require('../controllers')

router.post('/', orderController.postOrder) //Submit order (auth)
router.get('/:id', orderController.getById) //get order using orderID
router.get('/user/:id', orderController.getUserOrders) //get all orders from a user
router.get('/:municipality', orderController.getByMunicipality) //get order by municipality
router.put('/:id', orderController.update) //update order

module.exports = router
