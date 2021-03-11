
export default class UserAuthenticationService {

    // Declare Singleton instance for Service
    static instance = UserAuthenticationService.instance || new UserAuthenticationService()
    _url = "http://localhost:3000";
    _webToken;

    constructor(){
        this._webToken = null;
    }

    get webToken() {
        return this._webToken;
    }

    set webToken(token) {
        this._webToken = token;
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
        fetch(this._url, payload)
            .then(async (response) => {

                response = await response.json()
                // alert(response.jwt)
                this._webToken = response.jwt

            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                alert(this._webToken)
                // if response is error code, then alert "email or password incorrect"
                // else Navigate to Home Page (token should already be stored)
            })
    }

    sendRegistration(data) {
        // Validate Passwords
        if(data["password"] != data["password_confirmation"])
            alert("Contraseñas no concuerdan.")

        else {
            // Declare payload.
            let payload = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: data["full_name"],
                    email: data["email"],
                    password: data["password"],
                    phone: data["phone"]
                })
            }

            // Send payload within request.
            fetch(this._url, payload)
                .then(async response => {
                    response = await response.json()
                    // alert(response.jwt)
                    this._webToken = response.jwt
                })
                .catch(error => {
                    console.error(error)
                })
                .finally(() => {
                    alert(this._webToken)
                    // if response is email error, then alert "email already exists"
                    // else, navigate to Home Screen (token should already be stored)
                })
        }
    }
}