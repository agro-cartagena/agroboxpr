var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')
dotenv.config()

const createProductDb = async (product) => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return await collection
		.insertOne(product)
		.then((results) => {
			return results['ops'][0]
		})
		.catch((error) => console.error(error))
}

const findAllProductsDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	let product_catalog = collection.find({}).toArray()
	return product_catalog
}

const getProductByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.findOne({ _id: ObjectId(id) })
}

const validateDb = async (product) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	console.log('\nValidating...\n')

	// * Searches the database using the name of the product to be inserted
	return await collection.findOne({ product_name: product.product_name })
}

// * Searches the database using the name of the product to be updated
const validateIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return await collection.findOne({ _id: ObjectId(id) })
}

const updateProductDb = async (id, changes) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.updateOne({ _id: ObjectId(id) }, { $set: changes })
}

const deleteProductDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.deleteOne({ _id: ObjectId(id) })
}

module.exports = {
	createProductDb,
	findAllProductsDb,
	getProductByIdDb,
	updateProductDb,
	deleteProductDb,
	validateDb,
	validateIdDb,
}
