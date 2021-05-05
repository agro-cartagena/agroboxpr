import Service from './Service'

export default class ImageService extends Service {
    static instance = ImageService.instance || new ImageService()

    constructor() { super() }

    getURL(image_name) {
        return `${this._url}image/file/${image_name}`
    }
}