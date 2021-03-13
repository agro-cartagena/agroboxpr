import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserAuthenticationService {

    // Declare Singleton instance for Service
    static instance = UserAuthenticationService.instance || new UserAuthenticationService()
    _url = "http://localhost:5000/api/auth";
    _webToken;

    constructor(){
        this.loadWebToken();
    }

    get webToken() {
        return this._webToken
    }

    // This method gets called only once on init to fetch the token from storage.
    loadWebToken = async () => {
        await AsyncStorage.getItem('jwt_key')
            .then(token => this._webToken = token)
            .catch(error => alert("error loading token"))
    }

    setWebToken = async (token) => {
        await AsyncStorage.setItem('jwt_key', token)
            .then(() => this._webToken = token)
            .catch(error => alert("error storing token"))
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
        fetch(this._url + '/login', payload)
            .then(async (response) => {
                switch(response.status){
                    case 200: 
                        let webToken = await response.text()
                        this.setWebToken(webToken)

                        alert("logged in.")
                        // Redirect user to HomeScreen
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
            fetch(this._url + '/signup', payload)
                .then(async response => {
                    switch(response.status){
                        case 201:
                            // let webToken = await response.text()
                            // this.setWebToken(webToken)
                            alert("Gracias por registrarse!")
                            // Redirect user to HomeScreen.
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
}