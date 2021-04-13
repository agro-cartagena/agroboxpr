import Service from './Service'
import admins from '../db_mockup/admins.db'

export default class AdminService extends Service {
    static instance = AdminService.instance || new AdminService()

    constructor() { super() }

    async getAdmins() {
        return fetch(this._url + '/admins')
            .then(response => response.json())
            .then(admin_catalog => {
                return admin_catalog
            })
            .catch((error) => {
                // alert("Error de conexión.")
                return admins
            })
    }

    async addAdmin(admin_email) {
        let payload = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: admin_email
            })
        }

        return fetch(this._url + '', payload)
            .then(response => {
                if(response.status == 201)
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
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return fetch(this._url + `admin/remove?admin_id=${admin_id}`, payload)
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