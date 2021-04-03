const { productDb } = require('../db')

const { createProductDb, findAllProductsDb, getProductByIdDb, updateProductDb, deleteProductDb } = productDb
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
	console.log('Inside product service.')

	try {
		return await findAllProductsDb()
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
    deleteProduct
}
