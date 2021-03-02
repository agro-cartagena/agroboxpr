var mdb = require('./mdb')

const dotenv = require('dotenv')

dotenv.config()

const createBoxDb = async (box) => {
	console.log('Inserting to box db', box)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return await collection
		.insertOne(box)
		.then((results) => {
			console.log('Insertion succesfull')
			return results['ops'][0]['_id']
		})
		.catch((error) => console.error(error))
}

const findAllBoxesDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return collection.find({}).toArray()
}

const deleteBoxDb = async (boxName) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return await collection.deleteOne(boxName)
}

const getBoxProductsDb = async (boxDetail) => {
	const box = await findEntry(boxDetail)
	return box[0].Content
}

const getBoxPriceDb = async (boxDetail) => {
	const box = await findEntry(boxDetail)
	return box[0].price
}

const getBoxNameDb = async (boxDetail) => {
	const box = await findEntry(boxDetail)
	return box[0].name
}

//Helper entry finding function
const findEntry = async (boxDetail) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return collection.find(boxDetail.toString()).toArray()
}

module.exports = {
	createBoxDb,
	findAllBoxesDb,
	deleteBoxDb,
	getBoxProductsDb,
	getBoxNameDb,
	getBoxPriceDb,
}
