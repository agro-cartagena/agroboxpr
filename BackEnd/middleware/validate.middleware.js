var mdb = require('../db/mdb')
const { ObjectId } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

const validateProduct = async (product) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	console.log('\nValidating...\n')

	// * Searches the database using the name of the product to be inserted
	return await collection.findOne({ product_name: product.product_name })
}

const validateBoxName = async (box_name) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	console.log('\nValidating...\n')

	// * Searches the database using the name of the product to be inserted
	return await collection.findOne({ box_name: box_name })
}

// * Searches the database using the name of the product to be updated
const validateId = async (id, type) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection(type)

	return await collection.findOne({ _id: ObjectId(id) })
}

const validateUserId = async (user_Id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return await collection.findOne({user_id: user_Id})
}

const validateCity = async (city) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return await collection.findOne({deliveryCity: city})
}

const validateOrderContent = async (orderId) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('orderContent')

	return await collection.findOne({ order_id: ObjectId(orderId) })
}

module.exports = {
    validateProduct,
    validateId,
	validateUserId,
	validateCity,
	validateBoxName,
	validateOrderContent
}