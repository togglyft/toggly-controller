const express = require('express')
const router = express.Router()
const featuresController = require('../controllers/feature.controller');
// Retrieve all users
router.get('/', featuresController.findAll);
// Create a new user
router.post('/', featuresController.create);
// Retrieve a single user with id
router.get('/:id', featuresController.findOne);
// Update a user with id
router.put('/:id', featuresController.update);
// Delete a user with id
router.delete('/:id', featuresController.delete);
module.exports = router