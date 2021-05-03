var mdb = require('./mdb')
const { ObjectID } = require("mongodb");

const dotenv = require('dotenv');
dotenv.config();

const createResetPasswordTokenDb = async (newToken) => {

    const db = mdb.get().db(process.env.DB_NAME)
    const collection = db.collection('token')
  
    return await collection.insertOne(newToken)
    .then(results => {
      return results['ops'][0];
    }).catch(error => console.error(error))
}

const findTokenByUserIdDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('token')

	return collection.findOne({ user_id: ObjectID(id) })
}

const deleteTokenDb = async (id) => {
	const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('token')

	return collection.deleteOne({ _id: ObjectID(id) })
}

module.exports = {
    createResetPasswordTokenDb,
    findTokenByUserIdDb,
    deleteTokenDb
}