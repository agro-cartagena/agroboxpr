var express = require('express')
var router = express.Router()

const { boxController } = require('../controllers')


//insert new box to box db
router.post('/', boxController.postBox)

//Delete box from db - uses box name to delete
router.post('/removeBox', boxController.deleteBox)

//retrieve a list of boxes in the db
router.get('/', boxController.getBox)

//Getter Methods
router.post('/getProducts',boxController.getProducts)

router.post('/getPrice', boxController.getPrice)

router.post('/getName', boxController.getName)

//Setter Methods
// * Updates cannot currently use _id as a search query
router.post('/update', boxController.update)

// * Uses query and takes in a JSON list of products as second param
router.post('/addProduct', boxController.addProducts)


// * Setting box name and/or price can simply be done using /update
// * while properly formating the JSON object. 
// router.post('/setPrice', (req, res) => {
//     res.send({"action": "set box price"})
// })
// router.post('/setName', (req, res) => {
//     res.send({"action": "set box name"})
// })



module.exports = router
