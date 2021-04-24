var express = require('express')
var router = express.Router()
const authentication = require('../middleware/auth.middleware')
var { validateEntity } = require('../middleware/dataValidation.middleware')
var { orderBodySchema } = require('../middleware/validators.middleware')
const { orderController } = require('../controllers')



router.post('/', authentication.auth, validateEntity(orderBodySchema),orderController.postOrder) //Submit order (auth)
router.post('/manage/:id', orderController.manage)

router.put('/:id', orderController.update) //update order

router.get('/:id', orderController.getById) //get order using orderID
router.get('/user/:id', orderController.getUserOrders) //get all orders from a user
router.get('/city/:city', orderController.getByCity) //get order by municipality
router.get('/', orderController.getAll) //get all orders in system

module.exports = router
