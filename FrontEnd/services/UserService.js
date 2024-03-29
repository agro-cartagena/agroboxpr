import Service from './Service'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'

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
        AsyncStorage.getItem('authenticated')
            .then((result) => {
                // Resolves to token if it exists; 
                // otherwise, resolves to null.
                if(result == 'true'){
                    SecureStore.getItemAsync('jwt_key')
                    .then((token) => {
                        this.webToken = token
                    })
                    .catch((error) => {
                        alert("Error loading token.")
                        console.error(error)
                    })
                } 
            })
            .catch((error) => {
                alert("Ha ocurrido un error.")
                console.error(error)
            })
    }

    async setWebToken(token) {
        AsyncStorage.setItem('authenticated', 'true')
            .then(() => {
                SecureStore.setItemAsync('jwt_key', token)
                .then(() => {
                    this.webToken = token
                })
                .catch((error) => {
                    alert("error storing token")
                    console.error(error)
                })
            })
            .catch((error) => {
                alert("error saving token")
                console.error(error)
            })
        
    }

    async removeWebToken() {
        SecureStore.deleteItemAsync('jwt_key')
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
            return decoded.role == "admin" || decoded.role == "owner"
        }

        return false
    }

    async logout() {
        // this.removeWebToken()
        await AsyncStorage.setItem('authenticated', 'false')
        this.webToken = null;
    }

    async sendLogin(data) {
        for (let field in data){
            if(!data[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

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
        return fetch(this._url + 'auth/login', payload)
            .then(async (response) => {
                switch(response.status){
                    case 200: 
                        this.setWebToken(await response.text())
                        return true;
                    
                    case 403:
                        alert("Correo o contraseña incorrecta.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente mas tarde.")
                        return false
                }

            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }

    async sendRegistration(data) {
        for (let field in data){
            if(!data[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        // Validate Passwords
        if(data["password"] != data["password_confirmation"]) {
            alert("Contraseñas no concuerdan.") 
            return false
        }

        else if(data["password"].includes("password")){
            alert("Contraseña no es válida.")
            return false;
        }

        else if(data["password"].length < 8){
            alert("Contraseña debe tener al menos 8 caracteres.")
            return false;
        }

        else if(!data.email.includes("@")){
            alert("Correo electrónico no es válido.")
            return false
        }

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
            return fetch(this._url + 'auth/signup', payload)
                .then(async response => {
                    switch(response.status){
                        case 201:
                            this.setWebToken(await response.text())
                            return true;

                        case 409:
                            alert("Correo electrónico ya existe en la base de datos.")
                            return false;

                        default:
                            alert("Ha ocurrido un error. Por favor intente mas tarde.")
                            return false;
                    }
                })
                .catch(error => {
                    alert("Error de conexión.")
                    return false
                })
        }
    }

    async updateUserInformation(userData) {
        for (let field in userData){
            if(!userData[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        if(!userData.email.includes("@")) {
            alert("Correo electrónico no es válido.")
            return false;
        }

        // Declare payload.
        let payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.webToken
            },

            body: JSON.stringify(userData)
        }

        return fetch(this._url + 'auth/personalInfo', payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        alert("Información actualizada.")
                        return true;

                    case 404: 
                        alert("Usuario no existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })  
    }

    async updateAddress(addressData) {
        for (let field in addressData){
            if(!addressData[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        // Declare payload.
        let payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.webToken
            },
            body: JSON.stringify(addressData)
        }

        return fetch(this._url + 'auth/address', payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        alert("Informacion actualizada.")
                        return true;

                    case 404: 
                        alert("Usuario no existe en el sistema.")
                        return false;

                    case 500:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })  
    }

    async updatePassword(passwordData) {
        for (let field in passwordData){
            if(!passwordData[field]){
                alert("Entrada vacía.")
                return 
            }     
        }

        if(passwordData["new_password"] != passwordData["confirm_new_password"]) {
            alert("Contraseñas no concuerdan.") 
            return false
        }

        else if(passwordData["new_password"].includes("password")){
            alert("Contraseña no es válida.")
            return false;
        }

        else if(passwordData["new_password"].length < 8){
            alert("Contraseña debe tener al menos 8 caracteres.")
            return false;
        }

        // Declare payload.
        let payload = {
            method: 'PUT',
            headers: {
                'x-access-token': this.webToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                old_Password: passwordData.current_password,
                new_Password: passwordData.new_password
            })
        }

        return fetch(this._url + 'auth/password', payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        alert("Informacion actualizada.")
                        return true;

                    case 403:
                        alert("Contraseña actual incorrecta.")
                        return false;
                    
                    case 404:
                        alert("Usuario no existe em el sistema.")
                        return false;

                    case 500:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false;
            })  
    }

    async getUserData() {
        let payload = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': this.webToken
            }
        }

        return fetch(this._url + 'auth/user', payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return response.json() 
                    
                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false
                }
            })
            .then(userData => {
                const {name, email, phone} = userData
                const userInfo = {name, email, phone}

                const {address, city, state, zipcode} = userData
                const addressInfo = {address, city, state, zipcode}

                return [userInfo, addressInfo]
            })
            .catch(error => {
                alert("Error de conexión.")
                return false
            })
    }

    async sendForgotPassword(email) {
        let payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }, 
            body: JSON.stringify({ email })
        }

        return fetch(this._url + 'auth/forgotPassword', payload)
            .then((response) => {
                switch(response.status){
                    case 200: 
                        alert('¡Verifique su correo electrónico!')
                        return true

                    case 403:
                        alert('Correo electrónico no existe en el sistema.')
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false;
            })
    }
}