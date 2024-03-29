const { uploadImage } = require('../services/upload.service.js')

//Get environment variables
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose')
const url = process.env.CONNECTION_STRING

const connect = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let gfs;
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'images'
    })
})

const uploadImageFile = async (req, res, next) => {
    console.log("File: ", req.file)
    let result = uploadImage(req.file)

    if(result)
        res.status(201).send("Success")

    else
        res.status(500).send("Failure")
}

const fetchImage = async (req, res, next) => {
    gfs.find({ filename: req.params.filename })
        .toArray((err, files) => {
            if(!files[0] || files.length == 0){
                return res.status(404).send("Image not found")
            }

            if(files[0].contentType == 'image/jpeg'
                || files[0].contentType == 'image/png'
                || files[0].contentType == 'image/svg+xml') {
                gfs.openDownloadStreamByName(req.params.filename).pipe(res)
            } else {
                return res.status(409).send("Image not supported")
            }
        })
}

module.exports = {
    uploadImageFile, 
    fetchImage
}