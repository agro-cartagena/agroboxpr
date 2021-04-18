var express = require('express')
var router = express.Router()

const { orderController } = require('../controllers')

router.post('/', orderController.postOrder) //Submit order (auth)
router.get('/:id', orderController.getById) //get order using orderID
router.get('/user/:id', orderController.getUserOrders) //get all orders from a user
router.get('/city/:city', orderController.getByCity) //get order by municipality
router.put('/:id', orderController.update) //update order
router.get('/', orderController.getAll) //get all orders in system


module.exports = router
