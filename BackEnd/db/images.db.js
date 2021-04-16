var mdb = require('./mdb')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const ImageSchema = new mongoose.Schema({
    caption: String, 
    filename: String, 
    fileId: ObjectId
})

const Image = mongoose.model("Image", ImageSchema)

const insertImageDb = (image) => {
    const db = mdb.get().db(process.env.DB_NAME)
	const collection = db.collection('images')

    return collection.findOne({filename: image.filename})
        .then((image) => {
            if(image){
                throw new Error("Image already exists")
            }

            let newImage = new Image(image)
            newImage.save()
                .then(() => {
                    return true
                })
                .catch((error) => {throw error})
        })
        .catch((error) => {throw (error)})

}

module.exports = {
    insertImageDb
}