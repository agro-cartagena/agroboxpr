const boxes = [
    {
        id: 1,
        name: "AgroBox",
        uri: './assets/boxes/AgroBox.jpeg'
    },
    {
        id: 2,
        name: "SofritoBox",
        uri: './assets/boxes/SofritoBox.jpeg'
    },
    {
        id: 3,
        name: "SancochoBox",
        uri: './assets/boxes/SancochoBox.jpeg'
    },
    {
        id: 4,
        name: "AgroBox Plus",
        uri: './assets/boxes/AgroBoxPlus.jpeg'
    },
    {
        id: 5,
        name: "Crea tu propia caja",
        uri: './assets/boxes/BuildYourOwnBox.jpeg'
    }
]

const products = [
    {
        name: "Piña",
        quantity: 1, 
        units: "unidad(es)"
    },
    {
        name: "Plátanos",
        quantity: "5-8", 
        units: "unidad(es)"
    },
    {
        name: "Calabaza",
        quantity: "3-5", 
        units: "lbs"
    },
    {
        name: "Guineos",
        quantity: 1, 
        units: "mano"
    },
    {
        name: "Ñame",
        quantity: "2.5-4", 
        units: "lbs"
    },
    {
        name: "Tomate",
        quantity: 3, 
        units: "unidad(es)"
    },
    {
        name: "Cilantrillo",
        quantity: "1/4", 
        units: "lbs"
    },
    {
        name: "China y Lima (Verde)",
        quantity: 6, 
        units: "unidad(es)"
    },
    {
        name: "Pimiento para Cocinar",
        quantity: "1/2", 
        units: "lbs"
    },
    {
        name: "Cebolla",
        quantity: "1-2", 
        units: "lbs"
    },
]

const express = require('express')
const app = express()
const port = 5000

app.get('/:bid', (req, res) => {
    console.log(req.params.bid)
    res.send(products)
})

app.listen(port, () => {
    console.log(`AgroBox Test Server listening at http://localhost:${port}`)
})