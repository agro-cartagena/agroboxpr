import Service from './Service'

import orders from '../db_mockup/order.db'

export default class OrderService extends Service {
    static instance = OrderService.instance || new OrderService()

    constructor() { super() }

    async getOrders() {
        return fetch(this._url + 'route')
            .then((response) => {
                if (response.status == 200)
                    response.json()
                else 
                    //handle error
                    return false
            })
            .then((orders) => {
                return orders
            })
            .catch((error) => {
                // alert('Error de conexión.')
                return orders
            })
    }

    getOrdersByTownship() {
        return "TO-DO"
    }
}