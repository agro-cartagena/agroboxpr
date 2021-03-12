//Export Controllers

const productController = require('./product.controller')
const boxController = require('./box.controller')
const authController = require('./auth.controller')

module.exports = {
    productController,
    boxController,
    authController,
}