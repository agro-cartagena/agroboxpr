//Export Routers

const productRouter = require('./product');
const boxRouter = require('./box');
const authRouter = require('./auth');
const orderRouter = require('./order')

module.exports = {
    productRouter,
    boxRouter,
    authRouter,
    orderRouter
}
