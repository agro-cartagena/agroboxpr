const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const crypto = require('crypto')
const path = require('path')

//
const storage = new GridFsStorage({
    url: process.env.CONNECTION_STRING, 
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err)
                }

                const fileName = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: fileName,
                    bucketName: 'images'
                };
                resolve(fileInfo)
            })
        })
    }
})

module.exports = multer({ storage });