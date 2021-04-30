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

        return fetch(this._url + 'order/user', payload)
            .then((response) => {
                if (response.status == 200)
                    return response.json()
                else 
                    //handle error
                    return false;
            })
            .then((orders) => {
                if(!orders.hasOwnProperty("Pendiente"))
                    orders["Pendiente"] = []

                if(!orders.hasOwnProperty("En Camino"))
                    orders["En Camino"] = []

                if(!orders.hasOwnProperty("Completada"))
                    orders["Completada"] = []
                    
                return orders
            })
            .catch((error) => {
                alert('Error de conexión.')
                return false;
            })
    }

    async getAllOrders() {
        let payload = {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + 'order/', payload)
            .then((response) => {
                switch(response.status){
                    case 200:
                        return response.json()

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .then((orders) => {                    
                return orders
            })
            .catch((error) => {
                alert('Error de conexión.')
                return false
            })
    }

    async updateOrderStatus(order_id, status) {
        let payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify({ order_status : status })
        }

        return fetch(this._url + `order/${order_id}`, payload)
            .then((response) => {
                switch(response.status){
                    case 200: 
                        return true
                    
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

    async getOrderContent(order_id) {
        let payload = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': UserService.instance.webToken
            }
        }

        // return content
        return fetch(this._url + `content/${order_id}`, payload)
            .then((response) => {
                switch(response.status){
                    case 200:
                        return response.json()

                    default:
                        return false
                }
            })
            .then((content) => {
                return content
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }

    async submitOrder(order_info) {
        function generateId(length) {
            const result = [],
                  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                  charLength = characters.length;

            for (let i = 0; i < length; i++) 
              result.push(characters.charAt(Math.floor(Math.random() * charLength)));
           
           return result.join('');
        }

        const date = new Date();
        order_info.order.uid = generateId(10);
        order_info.order.order_date = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
        
        let payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify(order_info)
        }

        return fetch(this._url + 'order/', payload)
            .then((response) => {
                switch(response.status){
                    case 200: // Should be 201
                        return true

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
}