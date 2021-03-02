var express = require('express')
var router = express.Router()

const { boxController } = require('../controllers')
const { route } = require('./product')

//insert new box to box db
router.post('/', boxController.postBox)

//Delete box from db
router.post('/removeBox', (req, res) => {
	res.send({ action: 'remove box from db' })
})

//retrieve a list of boxes in the db
router.get('/', boxController.getBox)

//Get Methods
router.get('/getProducts', (req, res) => {
	res.send({ action: 'get product list' })
})
router.get('/getPrice', (req, res) => {
	res.send({ action: 'get box price' })
})
router.get('/getName', (req, res) => {
	res.send({ action: 'get box name' })
})

//Set Methods
router.post('/addProduct', (req, res) => {
    res.send({"action": "add box products"})
})

router.post('/setPrice', (req, res) => {
    res.send({"action": "set box price"})
})

router.post('/setName', (req, res) => {
    res.send({"action": "set box name"})
})



module.exports = router
