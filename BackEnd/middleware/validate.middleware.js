var mdb = require('../db/mdb')
const { ObjectId } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

const validateProductForInsert = async (product) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	console.log('\nValidating...\n')

	// * Searches the database using the name of the product to be inserted
	return await collection.findOne({ product_name: product.product_name })
}

// * Searches the database using the name of the product to be updated
const validateId = async (id, type) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection(type)

	return await collection.findOne({ _id: ObjectId(id) })
}

module.exports = {
    validateProductForInsert,
    validateId
}