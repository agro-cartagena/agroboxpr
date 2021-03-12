var express = require('express')
var router = express.Router()

const { boxController } = require('../controllers')


//insert new box to box db
router.post('/', boxController.postBox)

//retrieve a list of boxes in the db
router.get('/', boxController.getAllBoxes)

//retireve a spefic box using a given id
router.get('/:id',boxController.getById)

//Update box information
router.post('/update', boxController.update)

// * Uses query and takes in a JSON list of products as second param
router.post('/addProduct', boxController.addProducts)



module.exports = router
