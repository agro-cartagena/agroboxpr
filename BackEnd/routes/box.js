var express = require('express')
var router = express.Router()
var { auth, adminAuth, ownerAuth } = require('../middleware/auth.middleware')
var { validateBoxEntity } = require('../middleware/dataValidation.middleware')
const upload = require('../middleware/multer.middleware')

const { boxController } = require('../controllers')

//insert new box to box db
router.post('/', adminAuth, upload.single('file'), validateBoxEntity(), boxController.postBox)
// router.post('/', adminAuth, validateEntity(boxSchema), boxController.postBox)

router.put('/enable/:id', adminAuth, boxController.enableBox)
router.put('/disable/:id', adminAuth, boxController.disableBox)
router.put('/addProduct', adminAuth, boxController.addProducts)
router.put('/:id', adminAuth, upload.single('file'), validateBoxEntity(), boxController.updateBox)

router.get('/products/:id', boxController.getBoxProducts)
router.get('/available', boxController.getAvailableBoxes)
router.get('/:id',boxController.getById)
router.get('/', adminAuth,  boxController.getAllBoxes)

router.delete('/:id', adminAuth, boxController.deleteBox)

module.exports = router