var mdb = require('./mdb')
const { ObjectId } = require('mongodb')

const dotenv = require('dotenv')
dotenv.config()

const createProductDb = async (product) => {
	console.log('Inside Buyer db layer!', product)

	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return await collection
		.insertOne(product)
		.then((results) => {
			return results['ops'][0]['_id']
		})
		.catch((error) => console.error(error))
}

const findAllProductsDb = async () => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	let product_catalog =  collection.find({}).toArray()
  return product_catalog
}

const getProductByIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	return collection.findOne({ _id: ObjectId(id) })
}

const validateInsertDb = async (product) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

	console.log('\nValidating...\n')

	var searchResult = 'placeholder'

	// * Searches the database using the name of the product to be inserted
	await collection
		.findOne({ product_name: product.product_name })
		.then((result) => { searchResult = result	})
		.catch((error) => { console.log(error) })

	// * if a product is found within the database we will throw a new Error
	if (searchResult != null)
		throw new Error(`Product already within the database.`)
	
  // * otherwise we can continue with the insertion process
	else 
    return
}

	// * Searches the database using the name of the product to be updated
const validateGetDb = async (query) => {
  const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')


  var searchResult = 'placeholder'

  await collection
    .findOne(query)
    .then((result) => {searchResult = result})
    .catch((error)=> {console.log(error)})
  
  if (searchResult == null) 
    throw new Error("Product is not available in the database.")
  else
    return
}

const updateProductDb = async (id, changes) => {
  const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('product')

  return collection.updateOne({ _id: ObjectId(id) }, {$set: changes})
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
	validateInsertDb,
  validateGetDb
}
