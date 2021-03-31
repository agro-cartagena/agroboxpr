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
			return results['ops'][0]['_id']
		})
		.catch((error) => console.error(error))
}

const findAllProductsDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.find({}).toArray()
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

	var query = 'placeholder'

	// * Searches the database using the name of the product to be inserted
	await collection
		.findOne({ name: product.name })
		.then((result) => {
			query = result
		})
		.catch((error) => {
			console.log(error)
		})

	// * if a product is found within the database we will throw a new Error
	if (query != null)
		throw new Error(`'${product.name}' is already within the database.`)
	
  // * otherwise we can continue with the insertion process
	else return
}

module.exports = {
	createProductDb,
	findAllProductsDb,
	getProductByIdDb,
	validateDb,
}
