var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')

dotenv.config()

const createOrderDb = async (order) => {
	console.log('Inside order db layer!', order)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
	return await collection
		.insertOne(order)
		.then((results) => {
			console.log('Insertion succesfull')
			return results['ops'][0]
		})
		.catch((error) => console.error(error))
}

const readUserOrdersDb = async (userId) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({}).toArray()
}

const getOrderByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.findOne({ _id: ObjectId(id) })
}

const updateOrderDb = async (id, changes) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

    return collection.updateOne({ _id: ObjectId(id) }, {$set: changes})
}

const getOrderByMunicipalityDb= async (municipality) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

    return collection.findOne({})
}

module.exports = {
	createOrderDb,
	readUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByMunicipalityDb,
}
