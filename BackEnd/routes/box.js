var express = require('express')
var router = express.Router()
var { auth, adminAuth, ownerAuth } = require('../middleware/auth.middleware')
var { validateEntity } = require('../middleware/dataValidation.middleware')
var { boxSchema } = require('../middleware/validators.middleware')

const { boxController } = require('../controllers')


//insert new box to box db
router.post('/', adminAuth, validateEntity(boxSchema), boxController.postBox)

router.get('/products/:id', boxController.getBoxProducts)
router.get('/available', boxController.getAvailableBoxes)
router.get('/:id',boxController.getById)
router.get('/', adminAuth,  boxController.getAllBoxes)

router.put('/enable/:id', adminAuth, boxController.enableBox)
router.put('/disable/:id', adminAuth, boxController.disableBox)
router.put('/:id', adminAuth, boxController.updateBox)
router.put('/addProduct', adminAuth, boxController.addProducts)

router.delete('/:id', ownerAuth, boxController.deleteBox)

module.exports = router
