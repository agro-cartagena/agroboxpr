//Export Controllers

const productController = require('./product.controller')
const boxController = require('./box.controller')
const authController = require('./auth.controller')
const orderController = require('./order.controller')

module.exports = {
    productController,
    boxController,
    authController,
    orderController
}