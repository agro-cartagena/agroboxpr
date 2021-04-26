const express = require('express')
const router = express.Router()

const PaymentController = require('../controllers/payment.controller.js')

router.get('/athm', PaymentController.viewATHM)
// router.post('/athm', PaymentController.processATHM)

router.get('/paypal', PaymentController.viewPayPal)
router.get('/process/paypal', PaymentController.processPayPal)

router.get('/success', PaymentController.handleSuccess)
router.get('/cancel', PaymentController.handleCancel)

module.exports = router