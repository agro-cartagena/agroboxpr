export default class BoxService {
    // Declare Singleton instance for Service
    static instance = BoxService.instance || new BoxService()
    _url = "http://localhost:5000/";

    constructor() { }

    async getBoxList() {
        // fetch API uses GET request as default.
        return fetch(this._url, payload)
            .then(async (response) => {
                return await response.json()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async getBoxContentWith(box_id) {
        return fetch(this._url + `?bid=${box_id}`)
            .then(async (response) => {
                return await response.json()
            })
            .catch((error) => {
                console.error(error)
            })
    }
}