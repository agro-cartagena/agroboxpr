var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')
dotenv.config()

const createProductDb = async (product) => {
	console.log('Inside product db layer!', product)

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


const updateProductDb = async (id, changes) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.updateOne({ _id: ObjectId(id) }, { $set: changes })
}

const decreaseProductDb = async (id, changes) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.updateOne(
		{ _id: ObjectId(id) },
		{ $inc: { product_quantity_stock: -changes } }
	)
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
	decreaseProductDb

}
