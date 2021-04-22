import Service from './Service'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'

import Navigator from '../Navigator'
import user from '../db_mockup/user.db'

export default class UserAuthenticationService extends Service {
    // Declare Singleton instance for Service
    static instance = UserAuthenticationService.instance || new UserAuthenticationService()
    _webToken = null;

    constructor(){
        super()
        this.loadWebToken();
    }

    get webToken() {
        return this._webToken
    }

    set webToken(token) {
        this._webToken = token
    }

    // This method gets called only once on init to fetch the token from storage.
    async loadWebToken() {
        AsyncStorage.getItem('jwt_key')
            .then((token) => {
                // Resolves to token if it exists; 
                // otherwise, resolves to null.
                this.webToken = token
            })
            .catch((error) => {
                alert("error loading token.")
                console.error(error)
            })
    }

    async setWebToken(token) {
        AsyncStorage.setItem('jwt_key', token)
            .then(() => {
                this.webToken = token
            })
            .catch((error) => {
                alert("error storing token")
                console.error(error)
            })
    }

    async removeWebToken() {
        AsyncStorage.removeItem('jwt_key')
            .then(() => {
                this.webToken = null
            })
            .catch((error) => {
                alert("error deleting token")
                console.error(error)
            })
    }

    isAuthenticated() { 
        return this.webToken != null
    }

    isAdmin() {
        if(this.isAuthenticated()){
            let decoded = jwt_decode(this.webToken)
            return decoded.role == "admin"
        }

        return false
    }

    logout() {
        this.removeWebToken()
    }

    sendLogin(data) {
        // Declare payload
        let payload = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data["email"],
                password: data["password"]
            })
        };

        // Send payload within request
        fetch(this._url + 'auth/login', payload)
            .then(async (response) => {
                switch(response.status){
                    case 200: 
                        this.setWebToken(await response.text())
                        Navigator.instance.goToHome()
                        break;
                    
                    case 403:
                        alert("Correo o contraseña incorrecta.")
                        break;

                    default:
                        alert("Ha ocurrido un error. Por favor intente mas tarde.")
                }

            })
            .catch((error) => {
                console.error(error)
            })
    }

    sendRegistration(data) {
        // Validate Passwords
        if(data["password"] != data["password_confirmation"])
            alert("Contraseñas no concuerdan.")

        else if(data["password"] == "password")
            alert("Contraseña no es válida.")

        else {
            // Declare payload.
            let payload = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data["full_name"],
                    email: data["email"],
                    password: data["password"],
                    phone: data["phone"]
                })
            }

            // Send payload within request.
            fetch(this._url + 'auth/signup', payload)
                .then(async response => {
                    switch(response.status){
                        case 201:
                            this.setWebToken(await response.text())
                            alert("Gracias por registrarse!")
                            Navigator.instance.goToHome()
                            break;

                        case 409:
                            alert("Correo electrónico ya existe en la base de datos.")
                            break;

                        default:
                            alert("Ha ocurrido un error. Por favor intente mas tarde.")
                            break;
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    updateUserInformation(userData) {
        for (field in userData){
            if(!userData[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        // Declare payload.
        let payload = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData["full_name"],
                email: userData["email"],
                phone: userData["phone"]
            })
        }

        fetch(this._url + '/update?uid=${}', payload)
            .then(async response => {
                switch(response.status){
                    case 200:
                        alert("Informacion actualizada.")
                        break;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        break;
                }
            })
            .catch((error) => {
                console.error(error)
                alert("Error de conexión.")
            })  
    }

    updateAddress(addressData) {
        for (field in addressData){
            if(!addressData[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        // Declare payload.
        let payload = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                street: addressData["street"],
                city: addressData["city"],
                state: addressData["state"],
                zipcode: addressData["zipcode"]
            })
        }

        fetch(this._url + '/update?uid=${}', payload)
            .then(async response => {
                switch(response.status){
                    case 200:
                        alert("Informacion actualizada.")
                        break;

                    case 500:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        break;
                }
            })
            .catch((error) => {
                console.error(error)
                alert("Error de conexión.")
            })  
    }

    updatePassword(passwordData) {
        for (field in passwordData){
            if(!passwordData[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        if(passwordData["new_password"] != passwordData["confirm_new_password"]){
            alert("Contraseñas nuevas no son iguales.")
            return
        }

        // Declare payload.
        let payload = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_password: passwordData["current_password"],
                new_password: passwordData["new_password"]
            })
        }

        fetch(this._url + '/update?uid=${}', payload)
            .then(async response => {
                switch(response.status){
                    case 200:
                        alert("Informacion actualizada.")
                        break;

                    case 409:
                        alert("Contraseña actual incorrecta.")
                        break;
                    
                    case 500:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        break;
                }
            })
            .catch((error) => {
                console.error(error)
                alert("Error de conexión.")
            })  
    }

    async getUserData() {
        return fetch(this._url + 'userdata')
            .then(response => response.json())
            .then(userData => {
                const {full_name, email, phone} = userData
                const userInfo = {full_name, email, phone}

                const {street, city, state, zipcode} = userData
                const addressInfo = {street, city, state, zipcode}

                return [userInfo, addressInfo]
            })
            .catch(error => {
                // console.error(error)
                // alert("Error de conexión.")

                const {full_name, email, phone} = user
                const userInfo = {full_name, email, phone}

                const {street, city, state, zipcode} = user
                const addressInfo = {street, city, state, zipcode}

                return [userInfo, addressInfo]
            })
    }
}