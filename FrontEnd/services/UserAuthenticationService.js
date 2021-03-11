
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
            email: data["email"],
            password: data["password"]
        }

        alert(JSON.stringify(payload))

        // Send payload within request
        // fetch(this._url)
        //     .then((response) => {
        //         this._webToken = response.body["jwt"]
        //         alert(JSON.stringify(this._webToken))
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
        //     .finally(() => {
        //         alert(this._webToken)
        //         if response is error code, then alert "email or password incorrect"
        //         else Navigate to Home Page (token should already be stored)
        //     })
    }

    sendRegistration(data) {
        // Validate Passwords
        if(data["password"] != data["password_confirmation"])
            alert("Contraseñas no concuerdan.")

        else {
            // Declare payload.
            let payload = {
                full_name: data["full_name"],
                email: data["email"],
                password: data["password"],
                phone: data["phone"]
            }

            alert(JSON.stringify(payload))

            // Send payload within request.
            // fetch(this._url)
            //     .then(response => {
            //         this._webToken = response.body["jwt"]
            //     })
            //     .catch(error => {
            //         console.error(error)
            //     })
            //     .finally(() => {
            //         // alert(this._webToken)
            //         // if response is email error, then alert "email already exists"
            //         // else, navigate to Home Screen (token should already be stored)
            //     })
        }
    }
}