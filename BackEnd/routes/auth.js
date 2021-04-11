var express = require('express');
var router = express.Router();


const { authController } = require('../controllers')

router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)
router.put('/promote', authController.promoteUser)

module.exports = router;