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

const express = require('express')
const app = express()
const port = 5001

app.get('/', (req, res) => {
    console.log("received request")
    res.send(boxes)
})

app.listen(port, () => {
    console.log(`AgroBox Test Server listening at http://localhost:${port}`)
})