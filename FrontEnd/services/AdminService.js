import Service from './Service'
import UserService from './UserService'
import admins from '../db_mockup/admins.db'

export default class AdminService extends Service {
    static instance = AdminService.instance || new AdminService()

    constructor() { super() }

    async getAdmins() {
        let payload = {
            method: 'GET',
            headers: {
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + 'auth/adminList', payload)
            .then(response => response.json())
            .then(admins => {
                // alert(JSON.stringify(admins))
                return admins
            })
            .catch((error) => {
                // alert("Error de conexión.")
                return admins
            })
    }

    async addAdmin(admin_email) {
        let payload = {
            method: 'PUT',
            headers: {
                'x-access-token': UserService.instance.webToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: admin_email
            })
        }

        return fetch(this._url + 'auth/promote', payload)
            .then(response => {
                if(response.status == 200)
                    return true

                else
                    return false
            })
            .catch(() => {
                alert("Error de conexión.")
                return false;
            })
            
    }

    async removeAdmin(admin_id) {
        let payload = {
            method: 'PUT',
            headers: {
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + `auth/demote/${admin_id}`, payload)
            .then(response => {
                if(response.status == 200)
                    return true

                else
                    return false
            })
            .catch(() => {
                alert("Error de conexión.")
                return false
            })
    }
}