const { ObjectID } = require('mongodb')
const { insertImageDb } = require('../db/images.db')

const uploadImage = async (image_caption, image_file) => {
    let new_image = {
        caption: image_caption,
        filename: image_file.filename, 
        fileId: image_file.id
    }

    try {
        await insertImageDb(new_image)
        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    uploadImage
}