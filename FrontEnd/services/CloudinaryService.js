// const {cloudinary} = require('cloudinary-react')

// export default class CloudinaryService {
//     static instance = CloudinaryService.instance || new CloudinaryService()
//     _cloud 

//     constructor() { 
//         this._cloud = cloudinary.v2;
//         this._cloud.config({
//             cloud_name: 'dmgtwcsvf',
//             api_key: '681994657981227',
//             api_secret: 'zTFQwzUmCi42EIm4OxfSKm2-eBo'
//         })
//     }

//     async uploadImage(image) {
//         return this._cloud.uploader.upload(image.url)
//             .then(data => {
//                 alert('Upload succesful')
//                 return {
//                     id: data.public_id,
//                     url: data.url 
//                 }
//             })
//             .catch(() => {
//                 throw new Error("Ha ocurrido un error subiendo la imagen a la nube.")
//             })
//     }

//     async deleteImage(image_id) {
//         return this._cloud.uploader.destroy(image_id)
//             .then(() => {
//                 alert('Delete succesful')
//                 return true
//             })
//             .catch(() => {
//                 alert('Delete not succesful')
//                 return false
//             })
//     }
// }