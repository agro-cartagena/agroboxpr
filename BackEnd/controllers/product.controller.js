const { productService } = require('../services')

const {
	insertProduct,
	readAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} = productService

const postProduct = async (req, res, next) => {
	const product = req.body

	try {
		const insert = await insertProduct(product)
		if (insert != null) {
			res.sendStatus(201)
			next()
		} else {
			res.sendStatus(404)
			next()
		}
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

const update = async (req, res, next) => {
	const change = req.body
	const id = req.params.id

	try {
		const update = await updateProduct(id, change)
		if (update != null) {
			res.sendStatus(200)
			next()
		}
		else{
			res.sendStatus(404)
			next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const deletion = async (req, res, next) => {
	const id = req.params.id

	try {
		const deletion = await deleteProduct(id)
		if(deletion != null){
			res.sendStatus(200)
			next()
		}
		else{
			res.sendStatus(404)
			next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	postProduct,
	getProducts,
	getById,
	update,
	deletion,
}
