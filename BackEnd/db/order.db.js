var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')

dotenv.config()

const createOrderDb = async (order) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
	
	return await collection
		.insertOne(order)
		.then(() => {
			console.log('Insertion succesfull')
			return order._id
		})
		.catch((error) => console.error(error))
}

const getAllUserOrdersDb = async (user_Id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({ userId: user_Id }).toArray()
}

const getOrderByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.findOne({ _id: ObjectId(id) })
}

const readAllOrdersDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({}).toArray()
}

const updateOrderDb = async (id, changes) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.updateOne({ _id: ObjectId(id) }, { $set: changes })
}

const getOrderByCityDb = async (city) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({ deliveryCity: city }).toArray()
}

module.exports = {
	createOrderDb,
	getAllUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByCityDb,
	readAllOrdersDb,
}
