//Export Services

const productService = require('./product.service')
const boxService = require('./box.service')
const authService = require('./auth.service')
const orderService = require('./order.service')

module.exports = {
    productService,
    boxService,
    authService,
    orderService
}