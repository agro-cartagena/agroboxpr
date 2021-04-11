const { productDb } = require('../db')
const { validateMiddleware } = require('../middleware')

const {
	createProductDb,
	findAllProductsDb,
	getProductByIdDb,
	updateProductDb,
	deleteProductDb,
} = productDb

const { validateProductForInsert, validateId } = validateMiddleware

const insertProduct = async (product) => {
	console.log('Inside product service!', product)

	try {
		let validate
		await validateProductForInsert(product).then((result) => {
			validate = result
		})
		//No duplicate date
		if (validate == null) {
			return await createProductDb(product)
		}
		//Will duplicate data
		else {
			console.log('Cannot do insert')
			return null
		}
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
		let validate
		await validateId(id, 'product').then((result) => {
			validate = result
		})
		if (validate != null) {
			return await updateProductDb(id, changes)
		} else {
			return null
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

const deleteProduct = async (id) => {
	try {
		let validate
		await validateId(id, 'product').then((result) => {
			validate = result
		})
		if (validate != null) {
			return await deleteProductDb(id)
		} else {
			return null
		}
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
