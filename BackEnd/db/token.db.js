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

module.exports = {
    createResetPasswordTokenDb
}