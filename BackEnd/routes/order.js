var express = require('express')
var router = express.Router()
const authentication = require('../middleware/auth.middleware')
const { orderController } = require('../controllers')
var { validateEntity } = require('../middleware/dataValidation.middleware')
var { orderBodySchema } = require('../middleware/validators.middleware')

//Posts
router.post('/', authentication.auth, validateEntity(orderBodySchema), orderController.postOrder) //Submit order (auth)

//Gets
router.get('/id/:id', orderController.getById) //get order using orderID
router.get('/user', authentication.auth, orderController.getUserOrders) //get all orders from a user
router.get('/status', orderController.getByStatus) //get all orders sorted by status
router.get('/city/:city', orderController.getByCity) //get order by municipality
router.get('/', orderController.getAll) //get all orders in system

//Puts
router.put('/:id', orderController.update) //update order
router.put('/manage/:id', orderController.manage)

module.exports = router
