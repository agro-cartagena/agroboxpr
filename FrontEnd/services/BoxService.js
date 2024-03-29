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
            .then(response => {
                switch(response.status){
                    case 200:
                        return response.json()

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return box_list;
                }
            })
            .then((box_list) => {
                return box_list
            })
            .catch((error) => {
                alert("Error de conexión.")
                return box_list;
            })
    }

    async getAllAvailableBoxes() {
        return fetch(this._url + 'box/available')
            .then(response => {
                switch(response.status){
                    case 200:
                        return response.json()
                        
                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return box_list;
                }
            })
            .then((box_list) => {
                return box_list
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false;
            })
    }

    async getBoxContent(box_id) {
        return fetch(this._url + `box/products/${box_id}`)
            .then((response) => {
                switch(response.status){
                    case 200:
                        return response.json()

                    case 404:
                        alert("Caja no existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .then((content) => {
                return content
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false;
            })
    }

    async addNewBox(box) {
        for(let detail in box){
            // Verify for empty fields. Only box_content may be empty because of BuildYourBox.
            if(!box[detail] && detail != "box_content"){
                alert("Entrada vacía.")
                return false
            }
        }

        // Filter box_content to only include product id and quantity per box.
        box.box_content = box.box_content.map((item) => {
            const { _id, product_quantity_box} = item
            return { _id, product_quantity_box }
        })

        // Append fields to Form Data
        const body = new FormData()
        for (let attr in box) 
            body.append(attr, typeof box[attr] != "string" ? JSON.stringify(box[attr]) : box[attr])
        
        body.append('file', box.box_image)

        // Declare payload.
        let payload = {
            method: 'POST',
            headers: {
                'x-access-token': UserService.instance.webToken,
                'Content-Type': 'multipart/form-data'
            },
            body: body
        }

        // Send request and return response.
        return fetch(this._url + 'box', payload)
            .then(response => {
                switch(response.status){
                    case 201:
                        return true;

                    case 409:
                        alert("Caja con el mismo nombre ya existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch(() => {
                alert("Error de conexión.")
                return false;
            })
    }

    async updateBox(box) {
        for(let detail in box){
            if(detail == 'box_content')
                continue

            else if(!box[detail]){
                alert("Entrada vacía.")
                return false
            }
        }

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

        const body = new FormData()
        let hasFile = false;
        // New image was uploaded.
        if(typeof box.box_image != "string") {
            body.append('file', box.box_image)
            hasFile = true;
        } 

        for (let attr in box) {
            if (attr == "box_image" && hasFile)
                continue
            else
                body.append(attr, typeof box[attr] != "string" ? JSON.stringify(box[attr]) : box[attr])
        }        

        let payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': UserService.instance.webToken
            },
            body: body
        }

        return fetch(this._url + `box/${boxId}`, payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return true;

                    case 404:
                        alert("Caja no existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch(() => {
                alert("Error de conexión.")
                return false;
            })
    }

    async disableBox(box_id) {
        let payload = {
            method: 'PUT',
            headers: {
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + `box/disable/${box_id}`, payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return true

                    case 404:
                        alert("Caja no existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }

    async enableBox(box_id) {
        let payload = {
            method: 'PUT',
            headers: {
                'x-access-token': UserService.instance.webToken
            }
        }
        return fetch(this._url + `box/enable/${box_id}`, payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return true

                    case 404:
                        alert("Caja no existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }

    async removeBox(box_id) {
        let payload = {
            method: 'DELETE',
            headers: {
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + `box/${box_id}`, payload)
            .then((response) => {
                switch(response.status){
                    case 200:
                        return true

                    case 404:
                        alert("Caja no existe en el sistema.")
                        return false;

                    default:
                        alert
                        return false
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }
}