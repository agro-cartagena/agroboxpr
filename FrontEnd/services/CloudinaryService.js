import { FileSystem } from "react-native-unimodules"

const CLOUD_NAME = 'dmgtwcsvf'

export default class CloudinaryService {
    static instance = CloudinaryService.instance || new CloudinaryService()
    _url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    constructor() { }

    async uploadImage(image) {
        // alert(image.url)
        let filePath = await FileSystem.readAsStringAsync(image.url, {encoding: 'base64'})

        let payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: filePath,
                upload_preset: 'to_boxes'
            })
        }

        await fetch(this._url, payload)
            .then(response => response.json())
            .then(data => {
                // alert(`Image upload success. Data is: ${JSON.stringify(data)}`)
            })
            .catch(error => {
                // alert("Image upload failed. ", error)
            })
    }

    async deleteImage(image_id) {
        return this._cloud.uploader.destroy(image_id)
            .then(() => {
                alert('Delete succesful')
                return true
            })
            .catch(() => {
                alert('Delete not succesful')
                return false
            })
    }
}