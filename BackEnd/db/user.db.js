var mdb = require('./mdb')

const dotenv = require('dotenv');
dotenv.config();

const registerNewUserDb = async (newUser) => {

  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('user')

  return await collection.insertOne(newUser)
  .then(results => {
    return results['ops'][0];
  }).catch(error => console.error(error))
}

const findUserByFilterDb = async (filter) => {

  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('user')

  return await collection.find(filter).toArray()
}

const findUserByEmailAndUpdate = async (query, update) => {
  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('user')

  const options = { returnNewDocument: true };

  return await collection.findOneAndUpdate(query, update, options)
}

const findAdminAccountsDb = async (query) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('user')

	return collection.find(query).toArray()
}

module.exports = {
    registerNewUserDb,
    findUserByFilterDb,
    findUserByEmailAndUpdate,
    findAdminAccountsDb
}