const { productService } = require('../services')

const { insertProduct, readAllProducts, getProductById } = productService

const postProduct = async (req, res, next) => {
	const product = req.body

	try {
		await insertProduct(product)
		res.sendStatus(201)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getProducts = async (req, res, next) => {
	try {
		await readAllProducts().then((products) => {
			res.status(200).send(products)
		})
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		await getProductById(id).then((products) => {
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
	getById,
}
