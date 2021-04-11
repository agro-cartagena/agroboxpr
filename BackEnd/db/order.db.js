var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')

dotenv.config()

const createOrderDb = async (order) => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
}

const readAllOrdersDb = async () => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
}

const getOrderByIdDb = async (id) => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
}

const updateOrderDb = async (id) => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
}

const deleteOrderDb = async (id) => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')
}

module.exports = {
	createOrderDb,
	readAllOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	deleteOrderDb,
}
