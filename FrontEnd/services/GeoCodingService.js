import Service from './Service'

export default class GeoCodingService extends Service {
    static instance = GeoCodingService.instance || new GeoCodingService()

    constructor() { super() }

    async convertToAddress(coordinates) {
        const params = `latlng=${coordinates.latitude},${coordinates.longitude}`

        return fetch(this._url + `geocoder/address?${params}`)
            .then((response) => {
                switch(response.status){
                    case 200:
                        return response.json()

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false
                }
            })
            .then((address) => {
                return address
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false;
            })
    }

    async convertToCoordinates(address) {
        const params = `address=${address}`

        return fetch(this._url + `geocoder/coordinates?${params}`)
            .then((response) => {
                switch(response.status){
                    case 200:
                        return response.json()

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false
                }
            })
            .then((coordinates) => {
                return coordinates
            })
            .catch((error) => {
                alert("Error de conexión.")
                return false
            })
    }
}