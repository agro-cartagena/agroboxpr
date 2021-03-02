var express = require('express')
var router = express.Router()

const { boxController } = require('../controllers')


//insert new box to box db
router.post('/', boxController.postBox)

//Delete box from db
router.post('/removeBox', boxController.deleteBox)

//retrieve a list of boxes in the db
router.get('/', boxController.getBox)

//Getter Methods
router.get('/getProducts', (req, res) => {
	res.send({ action: 'get product list' })
})
router.get('/getPrice', (req, res) => {
	res.send({ action: 'get box price' })
})
router.get('/getName', (req, res) => {
	res.send({ action: 'get box name' })
})

//Setter Methods
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
