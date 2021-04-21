import Service from './Service'
const API = 'AIzaSyBfC6e_GixAOvOkAH6O02XV4dyPis3GRas'

export default class GeoCodingService extends Service {
    static instance = GeoCodingService.instance || new GeoCodingService()

    constructor() { super() }

    async convertToAddress(coordinates) {
        const params = `latlng=${coordinates.latitude},${coordinates.longitude}&key=${API}`

        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`)
            .then((response) => response.json())
            .then((data) => {
                let address = data.results[0]

                const findProperty = (property) => {
                    let components = address.address_components

                    // alert(JSON.stringify(components))
                    switch(property) {
                        case 'street':
                            let street = address.formatted_address.split(',')
                            street = street[0]
                            
                            return street

                        case 'city': 
                            let city = components.find((item) => item.types[0] == 'locality')
                            return city.short_name

                        case 'state':
                            let state = components.find((item) => item.types[0] == 'country')
                            return state.short_name

                        case 'zipcode':
                            let zipcode = components.find((item) => item.types[0] == 'postal_code')
                            return zipcode.short_name

                    }
                }

                return {
                    street: findProperty('street'),
                    city: findProperty('city'),
                    state: findProperty('state'),
                    zipcode:findProperty('zipcode')
                }
            })
            .catch((error) => {
                alert("Error")
            })
    }

    async convertToCoordinates(address) {
        const params = `address=${address}&key=${API}`

        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`)
            .then((response) => response.json())
            .then((data) => {
                const coordinates = data.results[0].geometry.location
                return {
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                }
            })
            .catch((error) => {
                alert("Error")
            })
    }
}