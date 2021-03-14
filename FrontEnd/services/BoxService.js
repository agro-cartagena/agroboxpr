export default class BoxService {
    // Declare Singleton instance for Service
    static instance = BoxService.instance || new BoxService()
    _url = "http://localhost:5001";

    constructor() { }

    async getBoxList() {
        // Declare payload
        let payload = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return fetch(this._url + '/', payload)
            .then(async (response) => {
                return await response.json()
            })
            .catch((error) => {
                console.error(error)
            })
    }
}