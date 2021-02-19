const { productDb } = require('../db')

const { createProductDb, findAllProductsDb } = productDb

const insertProduct = async (product) => {
    console.log("Inside product service!", product)
  
    try {
      return await createProductDb(product)
    } catch (e) {
      throw new Error(e.message)
    }
}

const readAllProducts = async () => {
    console.log("Inside product service.")

    try {
        return await findAllProductsDb()
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    insertProduct,
    readAllProducts,
}