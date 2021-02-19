var mdb = require('./mdb')

const dotenv = require('dotenv');
dotenv.config();

const createProductDb = async (product) => {
  console.log("Inside Buyer db layer!", product)

  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('product')

  return await collection.insertOne(product)
  .then(results => {
    return results['ops'][0]['_id'];
  }).catch(error => console.error(error))
}

const findAllProductsDb = async () => {

  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('product')

  return collection.find({}).toArray()
}

module.exports = {
  createProductDb,
  findAllProductsDb
}