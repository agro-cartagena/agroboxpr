import box_list from '../db_mockup/box.db'
import box_content from '../db_mockup/box.content.db'

import Service from './Service'
import UserService from './UserService'

export default class BoxService extends Service {
    // Declare Singleton instance for Service
    static instance = BoxService.instance || new BoxService()

    constructor() { super() }

    // Used BoxManagementScreen
    async getAllBoxes() {
        let payload = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + 'box', payload)
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

    async getAllAvailableBoxes() {
        return fetch(this._url + 'box/available')
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

    async getBoxContent(box_id) {
        return fetch(this._url + `box/products/${box_id}`)
            .then((response) => response.json())
            .then((content) => {
                return content
            })
            .catch((error) => {
                return box_content
            })
    }

    async addNewBox(box) {
        // for(detail in box){
        //     if(! box[detail] && detail != "box_content"){
        //         alert("Entrada vacía.")
        //         return false
        //     }
        // }

        // Filter box_content
        let filtered_content = []

        box.box_content.forEach((item) => {
            filtered_content.push({
                _id: item._id, 
                product_quantity_box: item.product_quantity_box
            })
        })

        box.box_content = filtered_content

        let payload = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify(box)
        }

        return fetch(this._url + 'box', payload)
            .then(response => {
                if(response.status == 201)
                    return true

                else
                    return false
            })
            .catch(() => {
                alert("Error de conexión.")
            })
    }

    async updateBox(box) {
        // for(detail in box){
        //     if(! box[detail] && detail != "box_content"){
        //         alert("Entrada vacía.")
        //         return false
        //     }
        // }

        // Filter box_content
        let filtered_content = []

        box.box_content.forEach((item) => {
            filtered_content.push({
                _id: item._id, 
                product_quantity_box: item.product_quantity_box
            })
        })

        box.box_content = filtered_content

        // Must remove box id to avoid server-side error.
        const boxId = box._id
        delete box._id

        let payload = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify(box)
        }

        return fetch(this._url + `box/${boxId}`, payload)
            .then(response => {
                if(response.status == 200)
                    return true

                else
                    return false
            })
            .catch(() => {
                alert("Error de conexión.")
            })
    }
}