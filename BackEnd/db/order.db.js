var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')

dotenv.config()

/**
 * Recieves a JSON object containing an order's shipping, user contact, and other relevant info and then 
 * inserts it into the order collection of the database. 
 * @param {JSON} order 
 * @returns {ObjectId} Returns the object's id generated at insertion
 * for use in the creation of the order content object.
 */
const createOrderDb = async (order) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return await collection
		.insertOne(order)
		.then((results) => {
			console.log('Insertion succesfull')
			return results['ops'][0]._id
		})
		.catch((error) => console.error(error))
}

/**
 * Retrieves all the orders within the collection pertaining to the specified user and returns them 
 * in an array.
 * @param {ObjectId} userID 
 * @returns {JSON[]} Array containing all orders for given user.
 */
const getAllUserOrdersDb = async (userID) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({ user_id: userID }).toArray()
}

/**
 * Retrieves an order for the collection with the given ObjectId.
 * @param {ObjectId} id 
 * @returns {JSON} Order whose id matches specified id.
 */
const getOrderByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.findOne({ _id: ObjectId(id) })
}

/**
 * Retrieves all orders within the collection and returns them in an array.
 * @returns {JSON[]} Array containing all orders in the collection.
 */
const readAllOrdersDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({}).toArray()
}

/**
 * Retrieves all the orders within the collection pertaining to the specified city and returns them 
 * in an array.
 * @param {string} city 
 * @returns {JSON[]} Array containing all orders for given city.
 */
const getOrderByCityDb = async (city) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.find({ delivery_City: city }).toArray()
}

/**
 * For the order document with matching id, the changes will be set. Multiple changes
 *  can be done at once by listing several key-value pairs denoting order properties.
 * @param {ObjectId} id 
 * @param {JSON} changes 
 * @returns {Promise} 
 */
const updateOrderDb = async (id, changes) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('order')

	return collection.updateOne({ _id: ObjectId(id) }, { $set: changes })
}


module.exports = {
	createOrderDb,
	getAllUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByCityDb,
	readAllOrdersDb,
}
