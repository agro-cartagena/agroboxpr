const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res) => {
    res.send({"jwt": "Hello World Again!"})
})

app.listen(port, () => {
    console.log(`AgroBox Test Server listening at http://localhost:${port}`)
})