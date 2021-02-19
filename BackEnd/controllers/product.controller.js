const { productService } = require('../services')

const { insertProduct, readAllProducts } = productService

const postProduct = async (req, res, next) => {
    const product = req.body

    try {
        await insertProduct(product)
        res.sendStatus(201)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const getProducts = async (req, res, next) => {

    try {
        await readAllProducts().then(products => {
            res.status(200).send(products)
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    postProduct,
    getProducts,
}