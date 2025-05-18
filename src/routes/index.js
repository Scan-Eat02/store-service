const express = require('express');
const router = express.Router();
const { storeController } = require('../controllers');
const { serviceEndpointPrefix } = require("../config");

// Signup route
router.post(`${serviceEndpointPrefix}/create-store`, (req, res) => storeController.createStoreAction(req, res));
router.delete(`${serviceEndpointPrefix}/delete-store`, (req, res) => storeController.deleteStoreAction(req, res));
router.put(`${serviceEndpointPrefix}/update-store`, (req, res) => storeController.updateStoreAction(req, res));
router.get(`${serviceEndpointPrefix}/get-admin-stores`, (req, res) => storeController.getUserStoresAction(req, res));
router.get(`${serviceEndpointPrefix}/get-all-stores`, (req, res) => storeController.getAllStoresAction(req, res));

// Store Event Request routes
router.post(`${serviceEndpointPrefix}/send-event-request`, (req, res) => storeController.storeEventRequestAction({ req, res }));
router.post(`${serviceEndpointPrefix}/accept-event-request`, (req, res) => storeController.acceptStoreEventRequestAction({ req, res }));

module.exports = router;
