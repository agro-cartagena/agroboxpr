//Exports db layer

const productDb = require('./product.db');
const boxDb = require('./box.db')
const userDb = require('./user.db');
const orderDb = require('./order.db')
const orderContentDb = require('./orderContent.db')

module.exports = {
    productDb,
    boxDb,
    userDb,
    orderDb,
    orderContentDb
}