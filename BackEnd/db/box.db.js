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

//Uses string version of the JSON file since findOne
//method fails when using the _id box param in JSON format
const findEntry = async (boxDetail) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return collection.find(boxDetail.toString()).toArray()
}

// * paramList will be a JSON list, where the first index is the search query
// * to use and the second index is the properties to update
const updateEntryDb = async (paramList) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	//Separate query and undate parameters from the parameter JSON list recieved
	const query = paramList[0]
	const update = paramList[1]

	// console.log(query, JSON.stringify(query));
	console.log('Updating...\n')
	return collection.updateOne(query, { $set: update })
}

const addProductListDb = async (paramList) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	const query = paramList[0]
	const update = paramList[1]

	return collection.update(query, {$push: {Content:{$each: update}}})
}

module.exports = {
	createBoxDb,
	findAllBoxesDb,
	deleteBoxDb,
	getBoxProductsDb,
	getBoxNameDb,
	getBoxPriceDb,
	updateEntryDb,
	addProductListDb,
}
