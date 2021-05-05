//Export Routers

const productRouter = require('./product');
const boxRouter = require('./box');
const authRouter = require('./auth');
const orderRouter = require('./order')
const orderContentRouter = require('./orderContent')

module.exports = {
    productRouter,
    boxRouter,
    authRouter,
    orderRouter,
    orderContentRouter
}
