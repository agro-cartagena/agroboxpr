const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const url = process.env.CONNECTION_STRING

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(("Mongoose Connected!"))
});

const ImageSchema = new mongoose.Schema({
    filename: String, 
    fileId: ObjectId
})

const Image = mongoose.model("Image", ImageSchema)

const insertImageDb = async (image) => {
    //
    const result = await Image.findOne({filename: image.filename})
        .then((foundImage) => {
            // console.log("Image: ", foundImage)
            if(foundImage){
                throw new Error("Image already exists")
            }

            // console.log("Image to be saved: ", image)
            let newImage = new Image(image)
            newImage.save()
                .then(() => {
                    return true
                })
                .catch((error) => {throw error})
        })
        .catch((error) => {throw (error)})

    console.log("Result: ", result)
    return result
}

module.exports = {
    insertImageDb
}