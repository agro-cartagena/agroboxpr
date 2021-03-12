//Export Routers

const productRouter = require('./product');
const boxRouter = require('./box');
const authRouter = require('./auth');

module.exports = {
    productRouter,
    boxRouter,
    authRouter,
}
