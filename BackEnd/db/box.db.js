var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')

dotenv.config()

/**
 * Creates a Box object using data from within the box JSON object parameter
 * to insert in the "box" collection of the database. Logs into console
 * whether or not the box has been properly inserted
 * @param  {JSON} box JSON Object containing all the data of the box
 */
const insertBoxDb = async (box) => {
	// console.log('Inserting to box db', box)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return await collection
		.insertOne(box)
		.then((results) => {
			console.log('Insertion succesfull')
			return results['ops'][0]
		})
		.catch((error) => console.error(error))
}

/**
 * Searches the "box" colection of the database for all available products and
 * returns a array containing the search results
 * @return {Array}  array containing all available boxes in the database
 */
const findAllBoxesDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return collection.find({}).toArray()
}

/**
 * Searches the "box" colection of the database for a specidied box utilizing 
 * its object id and returns a array containing the search results 
 * @param  {JSON} id Box id to use in search
 * @return {Promise} Returns the box with given id
 */
const getBoxByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	return collection.findOne({ _id: ObjectId(id) })
}

/**
 * Updates a single object entry in the "box" colecction within the databes
 * @param JSON-List First index contains the query parameter for the database search.
 * Second parameter contains update informations.
 */
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

/**
 * Inserts a product to the specified box, updating the Content list.
 * @param JSON-List First index contains the query parameter for the database search.
 * Second parameter contains Product object to be inserted.
 */
const addProductListDb = async (paramList) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('box')

	const query = paramList[0]
	const update = paramList[1]

	return collection.update(query, { $push: { Content: { $each: update } } })
}

module.exports = {
	insertBoxDb,
	findAllBoxesDb,
	getBoxByIdDb,
	updateEntryDb,
	addProductListDb,
}
