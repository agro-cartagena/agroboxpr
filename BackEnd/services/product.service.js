const { productDb } = require('../db')

const {
	createProductDb,
	findAllProductsDb,
	getProductByIdDb,
	updateProductDb,
	deleteProductDb,
} = productDb

const { validateInsertDb, validateGetDb } = productDb

const insertProduct = async (product) => {
	console.log('Inside product service!', product)

	try {
		await validateInsertDb(product)
		return await createProductDb(product)
	} catch (e) {
		throw new Error(e.message)
	}
}

const readAllProducts = async () => {
	try {
		let categories = []
		let product_catalog = []
		let response = {}

		await findAllProductsDb().then((products) => {
			product_catalog = products
			for (const prod in products) {
				if (!categories.includes(products[prod].product_category))
					categories.push(products[prod].product_category)
			}
		})

		categories.forEach((category) => {
			response = {
				[category]: product_catalog.filter(
					(product) => product.product_category == category
				),
				...response,
			}
		})

		return response
	} catch (e) {
		throw new Error(e.message)
	}
}

const getProductById = async (id) => {
	console.log(`Getting product with id: ${id}`)

	try {
		return await getProductByIdDb(id)
	} catch (e) {
		throw new Error(e.message)
	}
}

const updateProduct = async (id, changes) => {
	try {
		await validateGetDb(id)
		return await updateProductDb(id, changes)
	} catch (e) {
		throw new Error(e.message)
	}
}

const deleteProduct = async (id) => {
	try {
		await validateGetDb(id)
		return await deleteProductDb(id)
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	insertProduct,
	readAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
}
