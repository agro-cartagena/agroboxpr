import Service from './Service'
import UserService from './UserService'

import orders from '../db_mockup/order.db'
import content from '../db_mockup/order.content.db'

export default class OrderService extends Service {
    static instance = OrderService.instance || new OrderService()

    constructor() { super() }

    async getUserOrders() {
        let payload = {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + 'order/status', payload)
            .then((response) => {
                if (response.status == 200)
                    return response.json()
                else 
                    //handle error
                    return orders
            })
            .then((orders) => {
                return orders
            })
            .catch((error) => {
                // alert('Error de conexión.')
                return orders
            })
    }

    async getAllOrders() {
        return "TO-DO"
    }

    async updateOrderStatus(order_id, status) {
        let payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify({ status : status })
        }

        return true
        return fetch(this._url + `order/update/${order_id}`, payload)
            .then((response) => {
                switch(response.status){
                    case 200: 
                        return true
                    
                    default: 
                        return false
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }

    getOrderContent(order_id) {
        let payload = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': UserService.instance.webToken
            }
        }

        return content
        return fetch(this._url + `route/${order_id}`, payload)
            .then((response) => {
                switch(response.status){
                    case 200:
                        response.json()
                        break;

                    default:
                        return false
                }
            })
            .then((content) => {
                return content
            })
            .catch((error) => {
                alert("Error de conexión.")
                return content
            })
    }
}