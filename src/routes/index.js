const express = require('express');
const router = express.Router();
const { storeController } = require('../controllers');
const { serviceEndpointPrefix } = require("../config");

// Signup route
router.post(`${serviceEndpointPrefix}/create-store`, (req, res) => storeController.storeCreateAction(req, res));

module.exports = router;
