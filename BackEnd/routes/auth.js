var express = require('express');
var router = express.Router();
var { auth, adminAuth, ownerAuth } = require('../middleware/auth.middleware');
var { validateEntity } = require('../middleware/dataValidation.middleware');
var { userSchema } = require('../middleware/validators.middleware');

const { authController } = require('../controllers');

router.post('/signup', validateEntity(userSchema), authController.postSignup);
router.post('/login', authController.postLogin);
router.post('/logout', auth, authController.postLogout);

router.post('/forgotPassword', authController.postForgotPassword)
router.post('/resetPassword', authController.postResetPassword)

router.put('/personalInfo', auth, authController.putUserPersonalInfo);
router.put('/address', auth, authController.putUserAddress);
router.put('/password', auth, authController.putUserPassword);
router.put('/promote', adminAuth, authController.promoteUser);
router.put('/demote/:id', ownerAuth, authController.demoteUser);

router.get('/adminList', adminAuth, authController.getAllAdmin);
router.get('/user/isactive', auth, authController.getIsUserActive)
router.get('/user', auth, authController.getUser);

module.exports = router;