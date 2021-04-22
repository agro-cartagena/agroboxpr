var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')

dotenv.config()

const createOrderContentDb = async (orderContent) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('orderContent')

    return await collection
		.insertOne(orderContent)
		.then((results) => {
			console.log('Insertion succesfull')
            return results['ops'][0]
		})
		.catch((error) => console.error(error))
}

const getOrderContentDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('orderContent')

    return collection.find({}).toArray()
}

const getOrderContentByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('orderContent')

    return collection.findOne({ _id: ObjectId(id) })

}

const getOrderContentByOrder = async(orderId) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('orderContent')

    return collection.findOne({ order_id: ObjectId(orderId)})
}

const updateOderContentDb = async (id, changes) => {
    const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('orderContent')

    return collection.updateOne({ _id: ObjectId(id) }, { $set : changes })
}


module.exports = {
    createOrderContentDb,
    getOrderContentDb,
    getOrderContentByIdDb,
    updateOderContentDb,
	getOrderContentByOrder
}