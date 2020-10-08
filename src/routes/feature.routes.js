const express = require('express')
const router = express.Router()
const featuresController = require('../controllers/feature.controller');
// Retrieve all users
router.get('/features', featuresController.findAll);
// Create a new user
router.post('/features', featuresController.create);
// Retrieve a single user with id
router.get('/features/:id', featuresController.findOne);
// Update a user with id
router.put('/features/:id', featuresController.update);
// Delete a user with id
router.delete('/features/:id', featuresController.delete);
module.exports = router