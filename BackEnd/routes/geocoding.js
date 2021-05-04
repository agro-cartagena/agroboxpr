const express = require('express');
const router = express.Router()

const geocoderController = require('../controllers/geocoder.controller.js')

// Receives coordinates as parameter and returns natural language address.
router.get('/address', geocoderController.convertCoordinatesToAddress), 

// Receives natural language adress and returns coordinates.
router.get('/coordinates', geocoderController.convertAddressToCoordinates)

module.exports = router;