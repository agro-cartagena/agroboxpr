const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send({"hello": "Hello World!"})
})

app.listen(port, () => {
    console.log(`AgroBox Test Server listening at http://localhost:${port}`)
})