var express = require('express')
var router = express.Router()
var { auth, adminAuth } = require('../middleware/auth.middleware')

const { boxController } = require('../controllers')


//insert new box to box db
router.post('/', adminAuth, boxController.postBox)

router.get('/products/:id', boxController.getBoxProducts)

router.get('/available', boxController.getAvailableBoxes)

//retireve a spefic box using a given id
router.get('/:id',boxController.getById)

//retrieve a list of boxes in the db
router.get('/', adminAuth,  boxController.getAllBoxes)

//Update box information
router.put('/:id', adminAuth, boxController.updateBox)

// * Uses query and takes in a JSON list of products as second param
router.put('/addProduct', adminAuth, boxController.addProducts)



module.exports = router
