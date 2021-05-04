const { insertImageDb } = require('../db/image.db')

const uploadImage = async (image_file) => {
    let new_image = {
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