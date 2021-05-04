const fetch = require('node-fetch')
const API = process.env.GEOCODER_API_KEY

class GeocoderController {
    constructor() { }

    convertCoordinatesToAddress = async (req, res) => {
        const params = `latlng=${req.query.latlng}&key=${API}`

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

                return res.status(200).send({
                    address: findProperty('street'),
                    city: findProperty('city'),
                    state: findProperty('state'),
                    zipcode:findProperty('zipcode')
                })
            })
            .catch((error) => {
                console.error(error);
                return res.status(500).send(error)
            })
    }

    convertAddressToCoordinates = async (req, res) => {
        const params = `address=${req.query.address}&key=${API}`

        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`)
            .then((response) => response.json())
            .then((data) => {
                const coordinates = data.results[0].geometry.location

                return res.status(200).send({
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                }) 
            })
            .catch((error) => {
                console.error(error)
                return res.status(500).send(error)
            })
    }
}

module.exports = new GeocoderController()