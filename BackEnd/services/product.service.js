const { ObjectID } = require('mongodb')
const { productDb } = require('../db')
const { validationMiddleware } = require('../middleware')
const { validateBoxName } = require('../middleware/validate.middleware')

const {
	createProductDb,
	findAllProductsDb,
	getProductByIdDb,
	updateProductDb,
	deleteProductDb,
} = productDb

const { validateProduct, validateId } = validationMiddleware

const insertProduct = async (product) => {

	try {
		let validate =  await validateProduct(product)
		//No duplicate product
		if (validate == null) {
			return await createProductDb(product)
		}
		//Will duplicate data
		else {
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
			let validateName =  await validateProduct(changes)
			if(validateName == null || validateName._id.toString() == id){
				return await updateProductDb(id, changes)
			} else {
				return false
			}
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
