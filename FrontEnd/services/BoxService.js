import box_list from '../db_mockup/box.db'
import box_content from '../db_mockup/box.content.db'
import Service from './Service'

export default class BoxService extends Service {
    // Declare Singleton instance for Service
    static instance = BoxService.instance || new BoxService()

    constructor() { super() }

    // Used in HomeScreen and BoxManagementScreen
    async getAllBoxes() {
        return fetch(this._url + 'boxes')
            .then(response => response.json())
            .then((box_list) => {
                return box_list
            })
            .catch((error) => {
                // Temporary. Should properly handle error.
                // alert("Error caught")
                return box_list
            })
    }

    async getBoxContent() {
        return fetch(this.url + 'boxes/:box_id')
            .then(response => response.json())
            .then((box_content) => {
                return box_content
            })
            .catch((error) => {
                return box_content
            })
    }
}