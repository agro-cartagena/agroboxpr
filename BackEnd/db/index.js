//Exports db layer

const productDb = require('./product.db');
const boxDb = require('./box.db')
const userDb = require('./user.db');

module.exports = {
    productDb,
    boxDb,
    userDb
}