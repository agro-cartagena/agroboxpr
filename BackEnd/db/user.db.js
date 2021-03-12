var mdb = require('./mdb')

const dotenv = require('dotenv');
dotenv.config();

const registerNewUserDb = async (newUser) => {

  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('user')

  return await collection.insertOne(newUser)
  .then(results => {
    return results['ops'][0]['_id'];
  }).catch(error => console.error(error))
}

const findUserByFilterDb = async (filter) => {

  const db = mdb.get().db(process.env.DB_NAME)
  const collection = db.collection('user')

  return collection.find(filter).toArray()
}

module.exports = {
    registerNewUserDb,
    findUserByFilterDb
}