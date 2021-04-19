var express = require('express');
var router = express.Router();
var { auth, adminAuth } = require('../middleware/auth.middleware')

const { authController } = require('../controllers')

router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)
router.put('/promote', adminAuth, authController.promoteUser)
router.put('/demote', adminAuth, authController.demoteUser)

router.put('/', auth, authController.updateUserInfo)
// router.put('/info', auth, authController.)
router.put('/password', auth, authController.putUserPassword)

router.get('/adminEmails', adminAuth, authController.getAdminEmails)
router.get('/user', auth, authController.getUserById)


// router.get()

module.exports = router;