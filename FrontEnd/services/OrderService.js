import Service from './Service'
import UserService from './UserService'
import orders from '../db_mockup/order.db'

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

        return fetch(this._url + 'route', payload)
            .then((response) => {
                if (response.status == 200)
                    response.json()
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

    getAllOrders() {
        return "TO-DO"
    }
}